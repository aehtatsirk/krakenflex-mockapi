
# KrakenFlex Back End Test

- This project is bootstrapped with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli) using ESM, Typescript, and Standard Linter

      fastify generate <app> --esm --lang=ts --standardlint

- Used `json-schema-to-ts` to validate & type routes & swagger
- Auto-generated Swagger UI: `http://localhost:3000/docs` (production ready)
- Use `tap` and `axios-mock-adapter` to test and mock requests

## Available Scripts

In the project directory, you can run:
### `npm install`
### `npm run dev`

This app is integrated with swagger.
To start the app in dev mode,\
Open [http://localhost:3000/docs](http://localhost:3000/docs) to view it in the browser.

The API KEY is not saved in the repository and can be inputted through Swagger Security Authentication.\
Once a valid API key is logged, you can view in the [Swagger UI](http://localhost:3000/docs) the following endpoints that has a base path: `https://api.krakenflex.systems/interview-tests-mock-api/v1/`

1. `GET /outages` which returns all outages
2. `GET /site-info/{siteId}` which returns specific information about a site
3. `POST /site-outages/{siteId}` which expects outages for a specific site to be posted to it
   - Retrieves `GET /outages`
   - Retrieves information from the `GET /site-info/{siteId}` using the `siteId` parameter from the swagger: eg:`norwich-pear-tree`
   - Filters out any `/outages` that began before `2022-01-01T00:00:00.000Z` or don't have an ID that is in the list of devices in the `/site-info/{siteId}` information
   - For the remaining outages, it should attach the display `name` of the device in the `/site-info/{siteId}` information to each appropriate `outage`
   - Sends this list of outages to `POST /site-outages/{siteId}` for the site with the `siteId`parameter in the swagger

If an invalid API Key is inputted, a `403 Forbidden` error response is displayed.

### Bonus Requirements

- The API will occasionally return 500 status codes. Can you implement a solution that is resilient to this scenario?

A fastify plugin, [Circuit Breaker](https://github.com/fastify/fastify-circuit-breaker) is registered in the app to be able to improve the resilience and fault-tolerance of the API requests.

### `npm start`

For production mode

### `npm run test`

Run the test cases inside `./test`

## Plugins

- [Axios](https://github.com/axios/axios) - A plugin for Fastify that adds support for sending requests via axios.
- [Circuit Breaker](https://github.com/fastify/fastify-circuit-breaker) - A plugin for the Fastify web framework that provides circuit breaker functionality. A circuit breaker is a design pattern used to improve the resilience and fault-tolerance of a system by preventing cascading failures in distributed systems.
- [Cors](https://github.com/fastify/fastify-cors) - This plugins manages CORS headers in your Fastify applications
- [Swagger](https://github.com/fastify/fastify-swagger) - A Fastify plugin for serving Swagger (OpenAPI v2) or OpenAPI v3 schemas
