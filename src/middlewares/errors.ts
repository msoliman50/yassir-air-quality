/* eslint-disable */
import { Request, Response, NextFunction } from 'express';
import * as celebrate from 'celebrate';
import { BadRequestError } from '../types/errors';
import Logger from '../config/logger';

const errorConverter = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (celebrate.isCelebrateError(error)) {
    for (const [key, value] of error.details.entries()) {
      const badRequestError = new BadRequestError(`${key}: ${value.message}`);
      return next(badRequestError);
    }
  }
  next(error);
};

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message =
    error.message || 'Something went wrong, please try again later';
  const errorType = error.errorType || 'ServerError';
  Logger.error(`❌ ${status} ${errorType} : ${message}`);
  return res.status(status).json({ status, message, errorType });
};

export { errorConverter, errorHandler };
