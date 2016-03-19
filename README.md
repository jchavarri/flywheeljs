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

[](## Install)

[](- NodeJS / Browserify: `npm install flywheeljs --save`)

[](- 1998 script tag: [TODO])

## Promises

flywheeljs depends on a native ES6 Promise implementation to be [supported](http://caniuse.com/promises).
If your environment doesn't support ES6 Promises, you can [polyfill](https://github.com/jakearchibald/es6-promise).

## Contributing

Pull requests are welcomed. To get started:

- Download or clone the repo
- `npm install`
- `npm run test-browser`, you can open `runner.html` file to see run the test in a browser

## Todo

- [x] split build to have node and browser versions
- [x] gather information about other missing features (cancel request, add card, etc)
- [x] add link to Flywheel site
- [x] stop tracking 'dist' folder in git
- [x] use axios params instead of harcoded strings for get requests
- [ ] refine 'search' function params
- [ ] add trip request function
- [ ] increase test coverage
- [ ] documentation
- [ ] 'examples' folder
- [ ] publish to npm
