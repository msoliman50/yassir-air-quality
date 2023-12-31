import express, { Request, Response } from 'express';
import { Server } from 'http';
import cors from 'cors';

import { Config, validateEnvVariables } from './config';
import Logger from './config/logger';
import { createConnection } from './config/database';
import restRouter from './api/routes';
import { errorConverter, errorHandler } from './middlewares/errors';
import initCronJobs from './jobs';
import { initDocs } from './config/swagger';

export default class Application {
  private app: express.Application;

  constructor() {
    // init app
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    // healthcheck
    this.app.get('/healthcheck', (req: Request, res: Response) => {
      res.status(200).json({ status: 'OK' });
    });

    // init app routes
    this.app.use('/api', restRouter);

    // init docs
    initDocs(this.app);

    // error handling
    this.app.use(errorConverter);
    this.app.use(errorHandler);
  }

  public async bootstrap(): Promise<Server> {
    // validate env variables
    validateEnvVariables(Config);

    // connect to db
    await createConnection();

    // start the app
    const PORT = Config.PORT;
    const NODE_ENV = Config.NODE_ENV;

    const server = this.app.listen(PORT, () =>
      Logger.info(`App is up and running on port: ${PORT} in ${NODE_ENV} mode`)
    );

    return server;
  }

  public startCronJobs() {
    // init cron jobs
    initCronJobs();
  }
}
