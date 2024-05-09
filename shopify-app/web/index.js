// @ts-check
import { join } from 'path';
import { readFileSync } from 'fs';
import 'dotenv/config';
// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import serveStatic from 'serve-static';
import cors from 'cors';
import axios from 'axios';
import * as cron from 'node-cron';

import shopify from './shopify.js';
import GDPRWebhookHandlers from './gdpr.js';
import { getAllSession } from './session-storage.js';
import { billingConfig, FEE_PERCENTAGE } from './billing_config.js';
import { createUsageRecord, requestBilling } from './billing.js';

const PORT = parseInt(process.env.BACKEND_PORT ?? process.env.PORT ?? '3434', 10);

const { UPVOICE_API_URL } = process.env;

const STATIC_PATH = process.env.NODE_ENV === 'production'
  ? `${process.cwd()}/frontend/dist`
  : `${process.cwd()}/frontend/`;

const app = express();
app.disable('x-powered-by');

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  // Request payment if required
  requestBilling,
  // Load the app otherwise
  shopify.redirectToShopifyOrAppRoot(),
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers }),
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js
app.use('/api/*', shopify.validateAuthenticatedSession());

app.use(cors());

app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb' }));

app.use(express.json());

function handleSaveOrUpdateAbandonedCheckout() {
  getAllSession()
    .then((sessions) => {
      sessions.forEach((session) => {
        shopify.api.rest.AbandonedCheckout.checkouts({
          session,
        })
          .then((data) => {
            if (data && data.checkouts && data.checkouts.length) {
              const validCheckouts = data.checkouts.reduce((before, value, index) => {
                if (value.customer?.phone || value.customer?.default_address?.phone) {
                  before.push(value);
                }

                return before;
              }, []);

              if (validCheckouts.length) {
                data.checkouts = validCheckouts;
                axios
                  .post(
                    `${UPVOICE_API_URL}/api/checkout/saveOrUpdateAbandonedCheckout/${session.shop}`,
                    data,
                  )
                  .then(() => console.log(session.shop, 'saveOrUpdateAbandonedCheckout success'))
                  .catch(() => console.error(session.shop, 'saveOrUpdateAbandonedCheckout error'));
              } else {
                console.log(session.shop, 'abandonedCheckout have value but empty valid');
              }
            } else {
              console.log(session.shop, 'abandonedCheckout is empty');
            }
          })
          .catch((error) => console.error(session.shop, 'shopify.api.rest.AbandonedCheckout.checkouts error', error));
      });
    })
    .catch(() => console.error('get all session error'));
}

cron.schedule('*/30 * * * * *', async () => {
  try {
    handleSaveOrUpdateAbandonedCheckout();
  } catch (e) {
    console.log(e);
  }
});

async function handleAsyncUpdateCheckoutToCatchUp() {
  const sessions = await getAllSession();

  for (const session of sessions) {
    console.log(session.shop, "start handleAsyncUpdateCheckoutToCatchUp");
    const allOrders = await shopify.api.rest.Order.all({session, status: 'any'});
    if (!allOrders.data || allOrders.data.length == 0) {
      console.log(session.shop, 'Orders is empty');
      continue;
    }

    const response = await axios.put(
      `${UPVOICE_API_URL}/api/checkout/updateCheckoutToCatchUp/${session.shop}`,
      {data: allOrders.data}
    );

    if (!response.data || !response.data.data || response.data.data.length == 0) {
      console.log(session.shop, 'Not have any checkout updated');
      continue;
    }

    console.log('updateCheckoutToCatchUp success');
    for (const checkout of response.data.data) {
      if (checkout.status !== 'catchUp') {
        continue;
      }

      try {
        const fee = (+checkout.total_price * FEE_PERCENTAGE).toFixed(2).toString();
        const resp = await createUsageRecord(session, checkout.id, fee, checkout.currency);
        const capacityReached = resp.capacityReached;
        if (capacityReached && !resp.createdRecord) {
          console.log(session.shop, 'Could not create appUsageRecord because capacity was reached');
        } else {
          console.log(session.shop, `Created appUsageRecord for ${checkout.id}: ${fee} ${checkout.currency}`);
        }
      } catch (e) {
        console.log(session.shop, `Failed to process usage/create: ${e.message}`);
      }
    }
  }
}

cron.schedule('*/60 * * * * *', async () => {
  try {
    await handleAsyncUpdateCheckoutToCatchUp();
  } catch (e) {
    console.log(e);
  }
});

app.get('/api/shop/add', async (_req, res) => {
  try {
    const { session } = res.locals.shopify;
    const shop = await axios.post(`${UPVOICE_API_URL}/api/shop/add`, {
      name: session.shop,
    });
    res.status(200).send(shop);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post('/api/campaign/save', async (req, res) => {
  const { session } = res.locals.shopify;
  const { shop } = session;
  const data = req.body;
  data.shop = shop;
  delete data.status;

  try {
    const response = await axios.post(`${UPVOICE_API_URL}/api/campaign/save`, data);
    res.status(200).send({
      campaign: response.data,
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get('/api/campaign/get', async (req, res) => {
  const { session } = res.locals.shopify;
  const { shop } = session;
  try {
    const response = await axios.get(`${UPVOICE_API_URL}/api/campaign/get/${shop}`);
    res.status(200).send({
      campaign: response.data,
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get('/api/checkout/getCheckouts', async (req, res) => {
  const { session } = res.locals.shopify;
  const { shop } = session;
  try {
    const response = await axios.get(`${UPVOICE_API_URL}/api/checkout/getCheckouts/${shop}`);
    res.status(200).send({
      checkouts: response.data,
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get('/api/report/getSummary', async (req, res) => {
  const { session } = res.locals.shopify;
  const { shop } = session;
  try {
    const response = await axios.get(`${UPVOICE_API_URL}/api/report/getSummary/${shop}`);
    res.status(200).send(response.data);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get('/api/report/getMonthChart', async (req, res) => {
  const { session } = res.locals.shopify;
  const { shop } = session;
  try {
    const response = await axios.get(`${UPVOICE_API_URL}/api/report/getMonthChart/${shop}`);
    res.status(200).send(response.data);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.put('/api/campaign/update', async (_req, res) => {
  const { session } = res.locals.shopify;
  const { shop } = session;
  const data = _req.body;
  data.shop = shop;
  try {
    await axios.put(`${UPVOICE_API_URL}/api/campaign/update`, data);
    res.status(200).send({ status: 'success', message: 'Campaign updated' });
  } catch (e) {
    res.status(500).send(e);
  }
});

app.delete('/api/campaign/delete', async (_req, res) => {
  const { session } = res.locals.shopify;
  const { shop } = session;
  try {
    await axios.delete(`${UPVOICE_API_URL}/api/campaign/delete/${shop}`);
    res.status(200).send({ status: 'success', message: 'Campaign deleted' });
  } catch (e) {
    res.status(500).send({ status: 'error', message: 'Campaign not deleted' });
  }
});

app.post('/api/media/add', async (req, res) => {
  const data = req.body;
  try {
    const response = await axios.post(`${UPVOICE_API_URL}/api/media/add`, data);
    const media = response.data;
    res.status(200).send(media);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use('/*', shopify.ensureInstalledOnShop(), async (_req, res, _next) => res
  .status(200)
  .set('Content-Type', 'text/html')
  .send(readFileSync(join(STATIC_PATH, 'index.html'))));

app.listen(PORT);
