import request from 'supertest';
import { Server } from 'http';

import AirQuality from '../../src/api/resources/air-quality/air-quality.model';
import { mongoose } from '../../src/config/database';
import Application from '../../src/app';

const app = new Application();
let server: Server;

beforeAll(async () => {
  server = await app.bootstrap();
});

beforeEach(async () => {
  await AirQuality.deleteMany({});
});

afterAll(async () => {
  await AirQuality.deleteMany({});
  await mongoose.disconnect();
  await server.close();
});

describe('AirQuality', () => {
  describe('GET /nearest-city', () => {
    test('it should return 200 and the city pollution data', async () => {
      const response = await request(server).get(
        '/api/air-quality/nearest-city?lat=29.9864068&long=31.2438429'
      );
      expect(response.status).toBe(200);
      expect(response.body.message).toMatch('result retrieved successfully');
      expect(response.body.Result).toBeDefined();
      expect(response.body.Result.Pollution).toBeDefined();
      expect(response.body.Result.Pollution).toHaveProperty('aqius');
    });

    test('it should return 400 BadRequest if the lat is missing', async () => {
      const response = await request(server).get(
        '/api/air-quality/nearest-city'
      );
      expect(response.status).toBe(400);
      expect(response.body.errorType).toMatch('BadRequestError');
      expect(response.body.message).toMatch('query: "lat" is required');
    });

    test('it should return 400 BadRequest if the lat is not a number', async () => {
      const response = await request(server).get(
        '/api/air-quality/nearest-city?lat=hi'
      );
      expect(response.status).toBe(400);
      expect(response.body.errorType).toMatch('BadRequestError');
      expect(response.body.message).toMatch('query: "lat" must be a number');
    });

    test('it should return 400 BadRequest if the lat is not a number between [-90,90]', async () => {
      // should be less than 90
      const response = await request(server).get(
        '/api/air-quality/nearest-city?lat=120'
      );
      expect(response.status).toBe(400);
      expect(response.body.errorType).toMatch('BadRequestError');
      expect(response.body.message).toMatch(
        'query: "lat" must be less than or equal to 90'
      );

      // should be greater than -90
      const response2 = await request(server).get(
        '/api/air-quality/nearest-city?lat=-100'
      );
      expect(response2.status).toBe(400);
      expect(response2.body.errorType).toMatch('BadRequestError');
      expect(response2.body.message).toMatch(
        'query: "lat" must be greater than or equal to -90'
      );
    });

    test('it should return 400 BadRequest if the long is missing', async () => {
      const response = await request(server).get(
        '/api/air-quality/nearest-city?lat=10'
      );
      expect(response.status).toBe(400);
      expect(response.body.errorType).toMatch('BadRequestError');
      expect(response.body.message).toMatch('query: "long" is required');
    });

    test('it should return 400 BadRequest if the long is not a number', async () => {
      const response = await request(server).get(
        '/api/air-quality/nearest-city?lat=10&long=hi'
      );
      expect(response.status).toBe(400);
      expect(response.body.errorType).toMatch('BadRequestError');
      expect(response.body.message).toMatch('query: "long" must be a number');
    });

    test('it should return 400 BadRequest if the long is not a number between [-180,180]', async () => {
      // should be less than 180
      const response = await request(server).get(
        '/api/air-quality/nearest-city?lat=10&long=190'
      );
      expect(response.status).toBe(400);
      expect(response.body.errorType).toMatch('BadRequestError');
      expect(response.body.message).toMatch(
        'query: "long" must be less than or equal to 180'
      );

      // should be greater than -180
      const response2 = await request(server).get(
        '/api/air-quality/nearest-city?lat=10&long=-200'
      );
      expect(response2.status).toBe(400);
      expect(response2.body.errorType).toMatch('BadRequestError');
      expect(response2.body.message).toMatch(
        'query: "long" must be greater than or equal to -180'
      );
    });

    test('it should return 404 NotFound if the city info does not exist', async () => {
      const response = await request(server).get(
        '/api/air-quality/nearest-city?lat=10&long=150'
      );
      expect(response.status).toBe(404);
      expect(response.body.errorType).toMatch('NotFoundError');
      expect(response.body.message).toMatch(
        'Air quality info does not exist for lat=10,long=150'
      );
    });
  });

  describe('GET /city-most-polluted-time', () => {
    test('it should return 200 and the most polluted time for paris by default', async () => {
      await AirQuality.insertMany([
        { city: 'paris', aqius: 37, aqicn: 19 },
        { city: 'paris', aqius: 50, aqicn: 23 },
      ]);
      const response = await request(server).get(
        '/api/air-quality/city-most-polluted-time'
      );
      expect(response.status).toBe(200);
      expect(response.body.message).toMatch('result retrieved successfully');
      expect(response.body.Result).toBeDefined();
      expect(response.body.Result).toMatchObject({
        city: 'paris',
        maxAQI: 50,
      });
      expect(response.body.Result).toHaveProperty('datetime');
    });

    test('it should return 200 and the most polluted time for cairo', async () => {
      await AirQuality.insertMany([
        { city: 'paris', aqius: 37, aqicn: 19 },
        { city: 'cairo', aqius: 70, aqicn: 30 },
        { city: 'cairo', aqius: 40, aqicn: 20 },
      ]);
      const response = await request(server).get(
        '/api/air-quality/city-most-polluted-time?city=cairo'
      );
      expect(response.status).toBe(200);
      expect(response.body.message).toMatch('result retrieved successfully');
      expect(response.body.Result).toBeDefined();
      expect(response.body.Result).toMatchObject({
        city: 'cairo',
        maxAQI: 70,
      });
      expect(response.body.Result).toHaveProperty('datetime');
    });

    test('it should return 404 NotFound if the city info does not exist', async () => {
      const response = await request(server).get(
        '/api/air-quality/city-most-polluted-time?city=xyz'
      );
      expect(response.status).toBe(404);
      expect(response.body.errorType).toMatch('NotFoundError');
      expect(response.body.message).toMatch(
        'Air quality info does not exist for city: xyz'
      );
    });
  });
});
