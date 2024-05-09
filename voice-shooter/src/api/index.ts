import { Router } from 'express';
import pingRoute from './ping/ping.route';

const routes = Router();

routes.use(pingRoute);

export default routes;
