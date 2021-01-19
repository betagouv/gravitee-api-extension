Gravitee sidecar API built to expose Gravitee application details through a REST API.

## Description

This API is run next to Gravitee in order to let the `HttpCallout` plugin call for details about the authenticated Gravitee application.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

# test linting
$ npm run test:lint
```
