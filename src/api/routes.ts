import { Router } from 'express';

import airQualityRouter from './resources/air-quality/air-qualtiy.router';

// create RESTful APIs router
const restRouter = Router();

// init routes
restRouter.use('/air-quality', airQualityRouter);

export default restRouter;
