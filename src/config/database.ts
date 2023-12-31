import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

import { Config } from './';
import Logger from './logger';

const createConnection = async () => {
  try {
    await mongoose.connect(Config.DB_URI, { authSource: 'admin' });
    Logger.info('connected to database');
  } catch (error) {
    Logger.error(`failed to connect to database: ${error}`);
    process.exit(1);
  }
};

export { mongoose, createConnection };
