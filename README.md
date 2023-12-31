# Yassir Air Quality

## How to run MongoDB Instace

- To spin mongoDB instance you need to run

```
docker-compose up -d
```

the above command will spin up 2 containers:

- MongoDB instance running on port `28018` and it's mandatory for running the app or test cases
- MongoDB webclient, you can access it using `http://localhost:8081/` if you would like to explore the db collections, please use `username: admin and password: pass` if you're asked to provide credentials

## How to run the app

- To run the app, first make sure the mongoDB is up and running

```
# Install the needed dependencies
npm i
```

```
# Configure env variables

cp .env.example .env

-> add the api key for IQAIR_API_KEY
```

```
# Run the app
npm run dev
```

## How to run test cases

- To run the test cases, first make sure the mongoDB is up and running, the dependencies are installed, and the .env is setup correctly (from the previous step)

```
# Run test cases
npm test
```

## API Documentation

> NOTE: `The swagger documentation is available at localhost:9090/api-docs`

### And here is the list of available APIs

#### HealthCheck

- **GET** `localhost:9090/healthcheck`

#### Air Quality

- **GET** `localhost:9090/api/air-quality/nearest-city?lat={lat}&long={long}`

- **GET** `localhost:9090/api/air-quality/city-most-polluted-time?city={city}`
