import * as dotEnv from 'dotenv';
import { Joi } from 'celebrate';

import Logger from './logger';

// load configurations file
dotEnv.config({ path: `${__dirname}/../../.env` });

// env variables validation
export const validateEnvVariables = (config: object) => {
  const schema = Joi.object({
    PORT: Joi.number().required(),
    NODE_ENV: Joi.string().required(),
    DB_URI: Joi.string().required(),
    IQAIR_API_URL: Joi.string().required(),
    IQAIR_API_KEY: Joi.string().required(),
  });

  const { error } = schema.validate(config, { abortEarly: true });

  if (error) {
    Logger.error(`Env variables are not set properly, error: ${error.message}`);
    process.exit(1);
  }
};

// init config object
export const Config = {
  PORT: process.env.PORT ?? 9090,
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  DB_URI: process.env.DB_URI ?? '',
  IQAIR_API_URL: process.env.IQAIR_API_URL ?? '',
  IQAIR_API_KEY: process.env.IQAIR_API_KEY ?? '',
};
