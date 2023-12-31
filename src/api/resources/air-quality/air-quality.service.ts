import { NotFoundError } from '../../../types/errors';
import AirQuality from './air-quality.model';
import IQAirService from '../../../shared/services/iqair.service';

export default class AirQualityService {
  private static instance: AirQualityService;
  private readonly iqAirService = IQAirService.Instance;

  private constructor() {}

  static get Instance() {
    if (!this.instance) {
      this.instance = new AirQualityService();
    }
    return this.instance;
  }

  public getNearestCityAirQuality = async (lat: number, long: number) => {
    try {
      const result = await this.iqAirService.getNearestCityData(lat, long);
      const pollution = result?.data?.current?.pollution;
      if (!pollution) {
        throw new NotFoundError(
          `Air quality info does not exist for lat=${lat},long=${long}`
        );
      }
      return { Pollution: pollution };
    } catch (error) {
      throw error;
    }
  };

  public getCityMostPollutedTime = async (city: string) => {
    try {
      const records = await AirQuality.aggregate([
        { $match: { city } },
        {
          $group: {
            _id: null,
            maxAQI: { $max: '$aqius' },
            createdAt: { $last: '$createdAt' },
          },
        },
      ]);

      if (records.length === 0) {
        throw new NotFoundError(
          `Air quality info does not exist for city: ${city}`
        );
      }
      return {
        city,
        maxAQI: records[0].maxAQI,
        datetime: records[0].createdAt,
      };
    } catch (error) {
      throw error;
    }
  };
}
