import * as dotEnv from 'dotenv';
import Logger from '../src/config/logger';

// load configurations file
dotEnv.config({ path: `${__dirname}/../.env` });

const TEST_PROCESS_ENV = {
  PORT: 5050,
  NODE_ENV: 'testing',
  DB_URI: process.env.DB_URI_TEST,
};

// Set environment variables for test
process.env = Object.assign(process.env, TEST_PROCESS_ENV);
Logger.level = 'silent';
