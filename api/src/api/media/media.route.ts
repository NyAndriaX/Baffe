import { Router } from 'express';
import * as mediaApi from './media.controller';

const mediaRoute = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Media:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The media ID.
 *         file:
 *           type: string
 *           description: The media's file.
 *         audioBase64:
 *           type: string
 *           description: The media's audioBase64.
 *
 */
/**
 * @swagger
 * /api/media/add:
 *   post:
 *     summary: Add media
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 description: The media's file.
 *               audioBase64:
 *                 type: string
 *                 description: The media's audioBase64.
 *     responses:
 *       200:
 *         description: the new media has been added.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                      id:
 *                          type: string
 *                          description: The ID media
 *                          example: 637335aebd5c6aff1f659f2f
 */
mediaRoute.post('/add', mediaApi.add);

export default mediaRoute;
