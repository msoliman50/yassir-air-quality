import { Application, Request, Response } from 'express';
import swaggerJSDoc, { SwaggerDefinition } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Yassir Air Quality',
    version: '1.0.0',
    description: 'Yassir Air Quality',
    contact: {
      name: 'Mahmoud Soliman',
      email: 'mahmoudsoliman50@gmail.com',
    },
  },
  basePath: '/api',
};

const options = {
  swaggerDefinition,
  apis: [`${__dirname}/../api/resources/**/*.router.ts`],
};

const swaggerSpec = swaggerJSDoc(options);

export function initDocs(app: Application) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req: Request, res: Response) =>
    res.json(swaggerSpec)
  );
}
