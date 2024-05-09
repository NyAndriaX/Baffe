import express, { Application } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import apiRoute from '../api';

dotenv.config();
const app: Application = express();
app.disable("x-powered-by");

app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(morgan('combined'));
app.use('/api', apiRoute);

export default app;
