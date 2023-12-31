import { Router } from 'express';
import { celebrate } from 'celebrate';

import AirQualityController from './air-quality.controller';
import * as airQualityValidation from './air-qualtiy-validation';

// create router
const airQualityRouter = Router();

// init routes
const airQualityController = new AirQualityController();

/**
 * @swagger
 * /api/air-quality/nearest-city?lat={lat}&long={long}:
 *  get:
 *    tags:
 *      - Air Quality
 *    summary: Returns the nearest city pollution information for the given lat and long
 *    parameters:
 *      - in: query
 *        name: lat
 *        required: true
 *        schema:
 *          type: number
 *          example: 48.856613
 *        description: latitude value between [-90,90]
 *      - in: query
 *        name: long
 *        required: true
 *        schema:
 *          type: number
 *          example: 2.352222
 *        description: longitude value between [-180,180]
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 200
 *                message:
 *                  type: string
 *                  example: result retrieved successfully
 *                Result:
 *                  type: object
 *                  properties:
 *                    Pollution:
 *                      type: object
 *                      properties:
 *                        ts:
 *                          type: date
 *                          example: 2023-12-31T00:00:00.000Z
 *                        aqius:
 *                          type: integer
 *                          example: 23
 *                        mainus:
 *                          type: string
 *                          example: p2
 *                        aqicn:
 *                          type: integer
 *                          example: 19
 *                        maincn:
 *                          type: string
 *                          example: o3
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 400
 *                message:
 *                  type: string
 *                  example: query 'lat' is missing
 *                errorType:
 *                  type: string
 *                  example: BadRequestError
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Air quality info does not exist for lat=10,long=150
 *                errorType:
 *                  type: string
 *                  example: NotFoundError
 *      500:
 *        description: Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 500
 *                message:
 *                  type: string
 *                  example: Something went wrong, please try again later
 *                errorType:
 *                  type: string
 *                  example: ServerError
 *
 */
airQualityRouter.get(
  '/nearest-city',
  celebrate(airQualityValidation.GetNearestCityAirQualitySchema),
  airQualityController.getNearestCityAirQuality
);

/**
 * @swagger
 * /api/air-quality/city-most-polluted-time?city={city}:
 *  get:
 *    tags:
 *      - Air Quality
 *    summary: Returns the most polluted time for a given city (by default 'paris')
 *    parameters:
 *      - in: query
 *        name: city
 *        required: false
 *        schema:
 *          type: string
 *          example: paris
 *          default: paris
 *        description: the city to get the most polluted time for
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 200
 *                message:
 *                  type: string
 *                  example: result retrieved successfully
 *                Result:
 *                  type: object
 *                  properties:
 *                    datetime:
 *                      type: date
 *                      example: 2023-12-31T00:00:00.000Z
 *                    maxAQI:
 *                      type: integer
 *                      example: 70
 *                    city:
 *                      type: string
 *                      example: paris
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Air quality info does not exist for city xyz
 *                errorType:
 *                  type: string
 *                  example: NotFoundError
 *      500:
 *        description: Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 500
 *                message:
 *                  type: string
 *                  example: Something went wrong, please try again later
 *                errorType:
 *                  type: string
 *                  example: ServerError
 *
 */
airQualityRouter.get(
  '/city-most-polluted-time',
  celebrate(airQualityValidation.GetCityMostPollutedTimeSchema),
  airQualityController.getCityMostPollutedTime
);

export default airQualityRouter;
