
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


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

## Using

```
http://localhost:3000?url=<your URL>&minRate=<number>&maxRate=<number>&currency=<"your currency">&access_token=<your token for access>

EXAMPLE

http://localhost:3000/?url=https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml&minRate=20&maxRate=30&access_token=test-token
```

## Query Parameters

+ url - from which URL you want to parse XML data
+ currency - filtering based on currency
+ minRate - minimal rate(exchange) for data filtering
+ maxRate - maximal rate(exchange) for data filtering

