import { CronJob } from 'cron';

import Logger from '../config/logger';
import AirQualityJob from './air-quality.job';

const registeredJobs = [AirQualityJob];

const initCronJobs = () => {
  Logger.info('starting cron jobs...');
  for (const job of registeredJobs) {
    CronJob.from({
      cronTime: job.cronTime,
      onTick: job.onTick,
      start: true,
    });
  }
  Logger.info('started all the cron jobs successfully');
};

export default initCronJobs;
