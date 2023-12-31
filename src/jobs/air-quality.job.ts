import { CronExpression } from './types';
import Logger from '../config/logger';
import AirQuality from '../api/resources/air-quality/air-quality.model';
import IQAirService from '../shared/services/iqair.service';

export default class AirQualityJob {
  static cronTime = CronExpression.EVERY_MINUTE;
  static async onTick() {
    Logger.info('[AirQualityJob] has started...');
    const iqAirService = IQAirService.Instance;
    const PARIS_LAT = 48.856613;
    const PARIS_LONG = 2.352222;

    try {
      const result = await iqAirService.getNearestCityData(
        PARIS_LAT,
        PARIS_LONG
      );
      const pollution = result?.data?.current?.pollution;
      if (!(pollution && pollution.aqius && pollution.aqicn)) {
        throw new Error('Air quality index is not defined in the API response');
      }

      const { aqius, mainus, aqicn, maincn } = pollution;
      await AirQuality.create({
        aqius,
        aqicn,
        mainus,
        maincn,
      });

      Logger.info('✅ air quality record is inserted successfully');
    } catch (error) {
      Logger.error(error, '❌ [AirQualityJob] failed to store the AQI data');
    }
  }
}
