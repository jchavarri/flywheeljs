# 🚕 flywheeljs

A Javascript wrapper to the [Flywheel](http://flywheel.com/) REST API, for both NodeJS and the browser.

[![Travis build status](http://img.shields.io/travis/jchavarri/flywheeljs.svg?style=flat)](https://travis-ci.org/jchavarri/flywheeljs)
[![Code Climate](https://codeclimate.com/github/jchavarri/flywheeljs/badges/gpa.svg)](https://codeclimate.com/github/jchavarri/flywheeljs)
[![Coverage Status](https://coveralls.io/repos/github/jchavarri/flywheeljs/badge.svg?branch=master)](https://coveralls.io/github/jchavarri/flywheeljs?branch=master)
[![Dependency Status](https://david-dm.org/jchavarri/flywheeljs.svg)](https://david-dm.org/jchavarri/flywheeljs)

**DISCLAIMER** This project is an independent work and has not been authorized, sponsored, or otherwise approved by Flywheel Software Inc.

## Status

The library is in a very early stage of development and is not suitable for usage yet.

## Promises

flywheeljs depends on a native ES6 Promise implementation to be [supported](http://caniuse.com/promises).
If your environment doesn't support ES6 Promises, you can [polyfill](https://github.com/jakearchibald/es6-promise).

## Install

- NodeJS / Browserify: `npm install flywheeljs --save`

Other platforms / bundling tools could be easily added if needed.


## Getting started

To login a user and then order a cab:

```javascript

flywheel = require ('flywheeljs');

var userEmail = 'user@email.com';
var userPassword = 'userpassword';
var latitude = 37.615223; // Pickup latitude
var longitude = -122.389977; // Pickup longitude
var tip = 10 * 100; // 10$ tip
// These variables are needed to order the cab
var authToken = '';
var userName = '';
var userPhone = '';
var paymentToken = '';

flywheel.login({
  email: userEmail,
  password: userPassword
})
.then(function (response) {
  authToken = response.auth_token;
  userName = response.passenger.first_name;
  userPhone = response.passenger.telephone;
  paymentToken = response.passenger.payment_instruments[0].token;
  return flywheel.applicationContext({
    authToken: authToken,
    latitude: latitude,
    longitude: longitude
  });
})
.then(function (response) {
  return flywheel.createRide({
    pickUpLat: latitude,
    pickUpLon: longitude,
    passenger: {
      name: userName,
      phone: userPhone
    },
    paymentToken: paymentToken,
    serviceAvailabilitiesId: response.service_availabilities[0].id,
    tip: tip,
    authToken: authToken
  });
})
.then(function (response) {
  console.log("Your cab has been ordered! Your order id is: ", response.id);
})
.catch(function (error) {
  console.err('There was an error', error);
});

```

## Documentation

You will find all the documentation [here](docs/api.md).

## Contributing

Pull requests are welcomed. To get started:

-   Download or clone the repo
-   `npm install`
-   `npm run test-browser`, you can open `runner.html` file to see run the tests in the browser

## Todo

-   [ ] add delayed trip request
-   [ ] 'examples' folder
-   [ ] use npm instead of gulp (see this [library boilerplate](https://github.com/gaearon/library-boilerplate))
