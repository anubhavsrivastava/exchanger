## Exchange Point

A Currency Exchange demo app on typescript and react with hooks.

Checkout the online [demo](https://exchangepoint.netlify.app)

[![Build Status](https://travis-ci.org/anubhavsrivastava/exchanger.svg?branch=master)](https://travis-ci.org/anubhavsrivastava/exchanger)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/anubhavsrivastava/exchanger/)
[![GitHub issues](https://img.shields.io/github/issues/anubhavsrivastava/exchanger.svg?style=flat-square)](https://github.com/anubhavsrivastava/exchanger/issues)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## About the Exchange App

-   APP support User Wallet with GBP, EUR and USD as default Wallets. Currently, it is part of code but in production apps, this information can be fetched from API.
-   A Currency exchange is possible between Wallets of the user based on current exchange rates
-   The exchange rate are fetched from third party - https://api.exchangeratesapi.io for local development (free, not rate limited) and https://api.exchangerate.host for live demo(rate limited to 200 req/hour). Both APIS fetch rates from [Euro Central Bank](http://www.ecb.int/stats/exchange/eurofxref/html/index.en.html#dev). Exchange rate is updated every 10 seconds to let user exchange currencies at almost live rate.

## Installation and running

-   `npm i` and `npm start`

### Available Scripts

Checkout `package.json` -> `scripts` section

## Tech Stack

-   React
-   Typescript
-   Redux for state management
-   React testing library(@testing-library/jest)

### Contribution

Suggestions and PRs are welcome!

Please create issue or open PR request for contribution.
