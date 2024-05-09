import { Router } from 'express';
import shopRoute from './shop/shop.route';
import campaignRoute from './campaign/campaign.route';
import mediaRoute from './media/media.route';
import checkoutRoute from './checkout/checkout.route';
import reportRoute from './report/report.route';

const routes = Router();

routes.use('/shop', shopRoute);
routes.use('/campaign', campaignRoute);
routes.use('/media', mediaRoute);
routes.use('/checkout', checkoutRoute);
routes.use('/report', reportRoute);

export default routes;
