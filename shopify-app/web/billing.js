import { GraphqlQueryError } from '@shopify/shopify-api';
import shopify from './shopify.js';
import { billingConfig } from './billing_config.js';

export async function requestBilling(req, res, next) {
  const plans = Object.keys(billingConfig);
  const { session } = res.locals.shopify;
  const isTest = process.env.NODE_ENV == 'production' ? false : true;
  const hasPayment = await shopify.api.billing.check({
    session,
    plans,
    isTest: isTest,
  });

  if (hasPayment) {
    next();
  } else {
    res.redirect(
      await shopify.api.billing.request({
        session,
        plan: plans[0],
        isTest: isTest,
      }),
    );
  }
}

const CREATE_USAGE_RECORD = `
mutation appUsageRecordCreate($subscriptionLineItemId: ID!, $amount: Decimal!, $description: String!, $currencyCode: CurrencyCode!){
    appUsageRecordCreate(
      subscriptionLineItemId: $subscriptionLineItemId,
      description: $description,
      price: { amount: $amount, currencyCode: $currencyCode },
    ) {
      userErrors {
        field
        message
      }
      appUsageRecord {
        id
      }
    }
  }
`;

const HAS_PAYMENTS_QUERY = `
query appSubscription {
  currentAppInstallation {
    activeSubscriptions {
          id
          name
          lineItems {
                id
                plan {
                  pricingDetails {
                    __typename
                    ... on AppUsagePricing {
                      terms
                      balanceUsed {
                        amount
                      }
                      cappedAmount {
                        amount
                      }
                    }
                  }
                }
              }
          }
        }
    }
`;

/*
 * This function queries the API to get the app subscription line item ID by the
 * plan name and usage terms. You may want to store this ID in your database, but
 * for simplicity, we are querying the API for it here.
 */
async function getAppSubscription(session) {
  const client = new shopify.api.clients.Graphql({ session });
  let subscriptionLineItem = {};
  const planName = Object.keys(billingConfig)[0];
  const planDescription = billingConfig[planName].usageTerms;

  try {
    const response = await client.query({
      data: {
        query: HAS_PAYMENTS_QUERY,
      },
    });
    response.body.data.currentAppInstallation.activeSubscriptions.forEach(
      (subscription) => {
        if (subscription.name === planName) {
          subscription.lineItems.forEach((lineItem) => {
            // if (lineItem.plan.pricingDetails.terms === planDescription) {
              subscriptionLineItem = {
                id: lineItem.id,
                balanceUsed: parseFloat(
                  lineItem.plan.pricingDetails.balanceUsed.amount
                ),
                cappedAmount: parseFloat(
                  lineItem.plan.pricingDetails.cappedAmount.amount
                ),
              };
            // }
          });
        }
      },
    );
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }
  return subscriptionLineItem;
}

/*
 * This function creates a usage record for the app subscription.
 * To create a usage record, we need to know the app subscription line item ID.
 * You may want to store this ID in your database, but for simplicity, we are
 * querying the API for it here.
 */
export async function createUsageRecord(session, checkoutID, usageChargeAmount, currency) {
  const client = new shopify.api.clients.Graphql({ session });
  const subscriptionLineItem = await getAppSubscription(session);
  const plan = Object.keys(billingConfig)[0];
  const res = {
    capacityReached: false,
    createdRecord: false,
  };

  // If the capacity has already been reached, we will not attempt to create the usage record
  // On production shops, if you attempt to create a usage record and the capacity and been
  // reached Shopify will return an error. On development shops, the usage record will be created
  // TODO: handle case currency is USD but subscriptionLineItem.balanceUsed is EUR
  if (
    subscriptionLineItem.balanceUsed + parseFloat(usageChargeAmount)
    > subscriptionLineItem.cappedAmount
  ) {
    res.capacityReached = true;
    return res;
  }

  try {
    // This makes an API call to Shopify to create a usage record
    await client.query({
      data: {
        query: CREATE_USAGE_RECORD,
        variables: {
          subscriptionLineItemId: subscriptionLineItem.id,
          amount: usageChargeAmount,
          currencyCode: currency,
          // description: billingConfig[plan].usageTerms,
          description: `checkoutID: ${checkoutID}. ${billingConfig[plan].usageTerms}.`
        },
      },
    });
    res.createdRecord = true;
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }

  return res;
}
