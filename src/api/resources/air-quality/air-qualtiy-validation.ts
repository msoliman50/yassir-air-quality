import { Joi, Segments } from 'celebrate';

export const GetNearestCityAirQualitySchema = {
  [Segments.QUERY]: Joi.object()
    .options({ abortEarly: true })
    .keys({
      lat: Joi.number().min(-90).max(90).required(),
      long: Joi.number().min(-180).max(180).required(),
    }),
};

export const GetCityMostPollutedTimeSchema = {
  [Segments.QUERY]: Joi.object().keys({
    city: Joi.string().default('paris'),
  }),
};
