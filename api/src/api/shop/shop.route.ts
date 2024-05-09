import { Router } from 'express';
import * as shopApi from './shop.controller';

const shopRoute = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Shop:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The shop ID.
 *         name:
 *           type: string
 *           description: The shop's name.
 *
 */
/**
 * @swagger
 * /api/shop/add:
 *   post:
 *     summary: Add shop
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The shop's name.
 *     responses:
 *       200:
 *         description: A shop created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                      id:
 *                          type: string
 *                          description: The ID shop
 *                          example: 637335aebd5c6aff1f659f2f
 *                      name:
 *                          type: string
 */
shopRoute.post('/add', shopApi.add);

export default shopRoute;
