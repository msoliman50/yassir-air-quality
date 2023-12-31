import { Config } from '../../config';
import Logger from '../../config/logger';
import { HTTP_STATUS } from '../../types/http-status';

export default class IQAirService {
  private readonly baseURL: string;
  private readonly apiKey: string;
  private static instance: IQAirService;

  private constructor() {
    this.baseURL = Config.IQAIR_API_URL;
    this.apiKey = Config.IQAIR_API_KEY;
  }

  static get Instance() {
    if (!this.instance) {
      this.instance = new IQAirService();
    }
    return this.instance;
  }

  public async getNearestCityData(lat: number, long: number) {
    try {
      const url = `${this.baseURL}/nearest_city?lat=${lat}&lon=${long}&key=${this.apiKey}`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.ok) {
        return result;
      } else if (
        response.status === HTTP_STATUS.BAD_REQUEST ||
        response.status === HTTP_STATUS.NOT_FOUND
      ) {
        return null;
      } else {
        Logger.error(
          `[IQAirService] failed to fetch the nearest city data, error: ${JSON.stringify(
            result
          )}`
        );
        throw new Error(response.statusText);
      }
    } catch (error) {
      Logger.error(error);
      throw new Error('Something went wrong! please try again later');
    }
  }
}
