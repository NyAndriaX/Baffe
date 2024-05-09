import { Router } from 'express';
import * as campaignApi from './campaign.controller';

const campaignRoute = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Campaign:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         days:
 *           type: object
 *         optionDays:
 *           type: string
 *         optionSchedule:
 *           type: string
 *         scheduleBegin:
 *           type: string
 *         scheduleEnd:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         voiceMails:
 *           type: array
 *         state:
 *           type: string
 *         shop:
 *           type: string
 */
/**
 * @swagger
 * /api/campaign/save:
 *   post:
 *     summary: Create an new campaign
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               days:
 *                 type: object
 *               optionDays:
 *                 type: array
 *               optionSchedule:
 *                 type: string
 *               scheduleBegin:
 *                 type: string
 *               scheduleEnd:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               voiceMails:
 *                 type: array
 *               state:
 *                 type: string
 *               shop:
 *                 type: string
 *     responses:
 *       200:
 *         description: A campaign updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                      id:
 *                          type: string
 */
campaignRoute.post('/save', campaignApi.save);

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
campaignRoute.get('/get/:shop', campaignApi.getByShop);

/**
 * @swagger
 * /api/campaign/update:
 *   put:
 *     summary: Update status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               shop:
 *                 type: string
 *     responses:
 *       200:
 *         description: A campaign updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                      id:
 *                          type: string
 */
campaignRoute.put('/update', campaignApi.update);

/**
 * @swagger
 * /api/campaign/delete/{shop}:
 *   delete:
 *     summary: Delete campaign by shop
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
 */
campaignRoute.delete('/delete/:shop', campaignApi.deleteByShop);

export default campaignRoute;
