import { Router } from 'express';
import * as checkoutApi from './checkout.controller';

const checkoutRoute = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     AbandonedCheckout:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         abandoned_checkout_url:
 *           type: string
 *         cartToken:
 *           type: string
 *         token:
 *           type: string
 *         total_line_items_price:
 *           type: string
 *         name:
 *           type: string
 *         customerLocale:
 *           type: string
 *         email:
 *           type: string
 *         line_items:
 *           $ref: '#/components/schemas/LineItems'
 *         customer:
 *           $ref: '#/components/schemas/Customer'
 *         currency:
 *           $ref: '#/components/schemas/Currency'
 *         phone:
 *           $ref: '#/components/schemas/Phone'
 *     LineItems:
 *       type: object
 *       properties:
 *         sku:
 *           type: string
 *         product_id:
 *           type: string
 *         price:
 *           type: string
 *         quantity:
 *           type: integer
 *     Currency:
 *       type: object
 *       properties:
 *         currency:
 *           type: string
 *     Phone:
 *       type: object
 *       properties:
 *         phone:
 *           type: string
 *     Customer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *     ListAbandonedCheckout:
 *       type: object
 *       properties:
 *         checkouts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AbandonedCheckout'
 *     ListCheckoutIds:
 *       type: object
 *       properties:
 *         checkouts:
 *           type: array
 *           items:
 *             type: string
 */
/**
 * @swagger
 * /api/checkout/saveAbandonedCheckout/{shop}:
 *   post:
 *     summary: Save abandoned checkout
 *     parameters:
 *       - in: path
 *         name: shop
 *         required: true
 *         description: shop name
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ListAbandonedCheckout'
 *     responses:
 *       200:
 *         description: list checkout ids
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListCheckoutIds'
 */
checkoutRoute.post(
  '/saveOrUpdateAbandonedCheckout/:shop',
  checkoutApi.sendAndSaveOrUpdateAbandonedCheckout,
);

/**
 * @swagger
 * /api/checkout/updateCheckout/{shop}:
 *   put:
 *     summary: Save abandoned checkout
 *     parameters:
 *       - in: path
 *         name: shop
 *         required: true
 *         description: shop name
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ListAbandonedCheckout'
 *     responses:
 *       200:
 *         description: list checkout ids
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListCheckoutIds'
 */
checkoutRoute.put(
  '/updateCheckoutToCatchUp/:shop',
  checkoutApi.updateCheckoutToCatchUp,
);

/**
 * @swagger
 * /api/campaign/get/{shop}:
 *   get:
 *     summary: Fetch campaign by shop
 *     parameters:
 *       - in: path
 *         name: shop
 *         required: true
 *         description: shop name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A campaign fetched.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                      id:
 *                          type: string
 *                      optionDays:
 *                          type: array
 *                      optionSchedule:
 *                          type: array
 *                      scheduleBegin:
 *                          type: string
 *                      scheduleEnd:
 *                          type: string
 *                      phoneNumber:
 *                          type: string
 *                      voicemail:
 *                          type: array
 *                      state:
 *                          type: string
 *                      shop:
 *                          type: string
 */
checkoutRoute.get('/getCheckouts/:shop', checkoutApi.getCheckoutsByShop);

export default checkoutRoute;
