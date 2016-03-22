# flywheeljs

A Javascript wrapper to the [Flywheel](http://flywheel.com/) REST API, for both NodeJS and the browser.

[![Travis build status](http://img.shields.io/travis/jchavarri/flywheeljs.svg?style=flat)](https://travis-ci.org/jchavarri/flywheeljs)
[![Code Climate](https://codeclimate.com/github/jchavarri/flywheeljs/badges/gpa.svg)](https://codeclimate.com/github/jchavarri/flywheeljs)
[![Coverage Status](https://coveralls.io/repos/github/jchavarri/flywheeljs/badge.svg?branch=master)](https://coveralls.io/github/jchavarri/flywheeljs?branch=master)
[![Dependency Status](https://david-dm.org/jchavarri/flywheeljs.svg)](https://david-dm.org/jchavarri/flywheeljs)
[![devDependency Status](https://david-dm.org/jchavarri/flywheeljs/dev-status.svg)](https://david-dm.org/jchavarri/flywheeljs#info=devDependencies)

**DISCLAIMER** This project is an independent work and has not been authorized, sponsored, or otherwise approved by Flywheel Software Inc.

## Status

The library is in a very early stage of development and is not suitable for usage yet.

[](<## Install>)

[](<- NodeJS / Browserify: `npm install flywheeljs --save`>)

[](<- 1998 script tag: [TODO]>)

## Promises

flywheeljs depends on a native ES6 Promise implementation to be [supported](http://caniuse.com/promises).
If your environment doesn't support ES6 Promises, you can [polyfill](https://github.com/jakearchibald/es6-promise).

## Documentation

### search

[src/flywheel.js:74-84](https://github.com/jchavarri/flywheeljs/blob/36f38f1fc263dfe84f38f17166957856213346b8/src/flywheel.js#L74-L84 "Source code on GitHub")

**Parameters**

-   `$0` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options object parameter
    -   `$0.by` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** The field to search by (optional, default `'location'`)
    -   `$0.filter` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** A filter to be applied to the search request (optional, default `'hailable'`)
    -   `$0.latitude` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)=** Default latitude (in degrees) used when ordering cabs (optional, default `0`)
    -   `$0.longitude` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)=** Default longitude (in degrees) used when ordering cabs (optional, default `0`)
    -   `$0.authToken` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)=** User authentication token (if she's logged) (optional, default `'(null)'`)

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** search - An object containing:

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** search.drivers - Array containing the drivers available at that location. Some relevant fields are: `id`, `vehicle`, `latitude` and `longitude`.

### signup

[src/flywheel.js:49-62](https://github.com/jchavarri/flywheeljs/blob/36f38f1fc263dfe84f38f17166957856213346b8/src/flywheel.js#L49-L62 "Source code on GitHub")

Register a new user on the Flywheel service

**Parameters**

-   `$0` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)=(default {})** Options object parameter
    -   `$0.firstName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Flywheel user first name
    -   `$0.email` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Flywheel user email
    -   `$0.password` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Flywheel user password
    -   `$0.telephone` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Flywheel user phone number
    -   `$0.latitude` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)=** Default latitude (in degrees) used when ordering cabs (optional, default `0`)
    -   `$0.longitude` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)=** Default longitude (in degrees) used when ordering cabs (optional, default `0`)

**Examples**

```javascript
flywheel.signup({
  firstName: 'John',
  email: 'john@doe.com',
  password: 'johndoe123',
  telephone: 'johndoe123',
  latitude: 37.7,
  longitude: -122.4
})
.then(response => {
  console.log(response.data.passenger);
})
.catch(response => {
  console.log(response.data.error);
});
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** signup - An object containing:

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** signup.auth_token - The token that can be used for future requests

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** signup.passenger - An object including the user information. Some relevant fields are: `id`, `first_name`, `last_name`, and `email`.

## Contributing

Pull requests are welcomed. To get started:

-   Download or clone the repo
-   `npm install`
-   `npm run test-browser`, you can open `runner.html` file to see run the tests in the browser

## Todo

-   [x] split build to have node and browser versions
-   [x] gather information about other missing features (cancel request, add card, etc)
-   [x] add link to Flywheel site
-   [x] stop tracking 'dist' folder in git
-   [x] use axios params instead of harcoded strings for get requests
-   [x] add trip request function
-   [x] increase test coverage
-   [ ] add delayed trip request
-   [ ] documentation
-   [ ] 'examples' folder
-   [ ] use npm instead of gulp (see this [library boilerplate](https://github.com/gaearon/library-boilerplate))
-   [ ] publish to npm
