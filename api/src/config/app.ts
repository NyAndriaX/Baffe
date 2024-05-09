import express, { Application } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';

import apiRoute from '../api';

const app: Application = express();
app.disable('x-powered-by');

app.use(compression());
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: false }));
app.use(morgan('combined'));
app.use('/api', apiRoute);

export default app;
