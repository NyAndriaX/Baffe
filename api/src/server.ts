import 'dotenv/config';
import app from './config/app';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import config from './config/config';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: config.appName ?? '',
      version: config.appVersion ?? '',
      description: config.appDescription ?? '',
    },
  },
  apis: [`${__dirname}/api/**/*.route.ts`],
};

const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const port = process.env.PORT ?? 1789;

const server = app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});

export default server;
