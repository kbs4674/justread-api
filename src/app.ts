import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import globalRouter from './routes/global';
import { globalErrorHandler } from './libs/middlewares/globalErrorHandler';
import { passportAuthenticate } from './libs/auth';

const createApp = async (): Promise<express.Application> => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan('combined'));
  app.use(passport.initialize());
  app.use(passportAuthenticate);

  app.use('', globalRouter);

  app.use(globalErrorHandler);

  return app;
};

export default createApp;
