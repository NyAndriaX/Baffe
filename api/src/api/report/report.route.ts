import { Router } from 'express';
import * as reportAPI from './report.controller';

const reportRoute = Router();
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
 *     MonthChartItem:
 *       type: object
 *       properties:
 *         month:
 *           type: string
 *         year:
 *           type: string
 *         numRecovered:
 *           type: integer
 *         numVoicemail:
 *           type: integer
 *     MonthChartData:
 *       type: object
 *       additionalProperties: 
 *         $ref: '#/components/schemas/MonthChartItem'
 *       example:
 *         2023_9:
 *           month: 9
 *           year: 2023
 *           numRecovered: 1
 *           numVoicemail: 2
 *         2023_10:
 *           month: 10
 *           year: 2023
 *           numRecovered: 2
 *           numVoicemail: 5
 *     SummaryData:
 *       type: object
 *       properties:
 *         total:
 *           type: string
 *         totalMonth:
 *           type: string
 *         basketPercent:
 *           type: string
 *         basketMonthPercent:
 *           type: string
 *         catchUpTime:
 *           type: string
 *         catchUpTimeMonth:
 *           type: string
 */


/**
 * @swagger
 * /api/report/getSummary/{shop}:
 *   get:
 *     summary: Fetch summary report data for overview by shop
 *     parameters:
 *       - in: path
 *         name: shop
 *         required: true
 *         description: shop name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A summary fetched.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SummaryData'
 */
reportRoute.get('/getSummary/:shop', reportAPI.getSummaryByShop);

/**
 * @swagger
 * /api/report/getMonthChart/{shop}:
 *   get:
 *     summary: Fetch report data to draw month chart by shop
 *     parameters:
 *       - in: path
 *         name: shop
 *         required: true
 *         description: shop name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A report fetched.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MonthChartData'
 */
reportRoute.get('/getMonthChart/:shop', reportAPI.getMonthChartByShop);

/**
 * @swagger
 * /api/report/getCheckouts/{shop}:
 *   get:
 *     summary: Fetch checkout report data by shop
 *     parameters:
 *       - in: path
 *         name: shop
 *         required: true
 *         description: shop name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A checkouts fetched.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListAbandonedCheckout'
 */
reportRoute.get('/getCheckouts/:shop', reportAPI.getCheckoutsByShop);

export default reportRoute;
