import { NextFunction, Request, Response } from 'express';

import { HTTP_STATUS } from '../../../types/http-status';
import AirQualityService from './air-quality.service';

export default class AirQualityController {
  private airQualityService = AirQualityService.Instance;

  public getNearestCityAirQuality = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { lat, long } = req.query as { [key: string]: string };
      const Result = await this.airQualityService.getNearestCityAirQuality(
        parseFloat(lat),
        parseFloat(long)
      );
      return res.status(HTTP_STATUS.SUCCESS).json({
        status: HTTP_STATUS.SUCCESS,
        message: 'result retrieved successfully',
        Result,
      });
    } catch (error) {
      return next(error);
    }
  };

  public getCityMostPollutedTime = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { city } = req.query as { [key: string]: string };
      const Result = await this.airQualityService.getCityMostPollutedTime(city);
      return res.status(HTTP_STATUS.SUCCESS).json({
        status: HTTP_STATUS.SUCCESS,
        message: 'result retrieved successfully',
        Result,
      });
    } catch (error) {
      return next(error);
    }
  };
}
