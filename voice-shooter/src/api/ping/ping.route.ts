import { Router } from 'express';
import * as controller from './ping.controller';

const pingRoute = Router();

/**
 * @swagger
 * /api/ping:
 *   get:
 *     summary: Check if api is available
 *     description: Check if api is available
 */
pingRoute.get('/ping', controller.ping);

export default pingRoute;
