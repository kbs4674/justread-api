import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import globalRouter from './routes/global';
import { globalErrorHandler } from './utils/middlewares/globalErrorHandler';

const createApp = async (): Promise<express.Application> => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan('combined'));

  app.use('', globalRouter);

  app.use(globalErrorHandler);

  return app;
};

export default createApp;
