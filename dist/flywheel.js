(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["flywheel"] = factory();
	else
		root["flywheel"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var baseURL = 'https://mobile.flywheel.com';
	
	var flywheel = {
	  signup: function signup(_ref) {
	    var firstName = _ref.firstName;
	    var email = _ref.email;
	    var password = _ref.password;
	    var telephone = _ref.telephone;
	    var _ref$latitude = _ref.latitude;
	    var latitude = _ref$latitude === undefined ? 0 : _ref$latitude;
	    var _ref$longitude = _ref.longitude;
	    var longitude = _ref$longitude === undefined ? 0 : _ref$longitude;
	
	    if (firstName === undefined || email === undefined || password === undefined || telephone === undefined) {
	      throw new Error('Missing parameter');
	    }
	
	    var url = baseURL + '/passengers';
	
	    return fetch(url, {
	      method: 'post',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify({
	        first_name: firstName,
	        email: email,
	        password: password,
	        telephone: telephone,
	        latitude: latitude,
	        longitude: longitude,
	        adjust_xid_type: 'idfa',
	        adjust_xid: '12345678-1234-1234-1234-123456789012',
	        persistent_device_id: '12345678-1234-1234-1234-123456789012'
	      })
	    }).then(function (r) {
	      return r.json();
	    });
	  },
	  search: function search(_ref2) {
	    var _ref2$by = _ref2.by;
	    var by = _ref2$by === undefined ? 'location' : _ref2$by;
	    var _ref2$filter = _ref2.filter;
	    var filter = _ref2$filter === undefined ? 'hailable' : _ref2$filter;
	    var _ref2$latitude = _ref2.latitude;
	    var latitude = _ref2$latitude === undefined ? 0 : _ref2$latitude;
	    var _ref2$longitude = _ref2.longitude;
	    var longitude = _ref2$longitude === undefined ? 0 : _ref2$longitude;
	    var _ref2$authToken = _ref2.authToken;
	    var authToken = _ref2$authToken === undefined ? '(null)' : _ref2$authToken;
	
	    var url = baseURL + '/search' + '?by=' + by + '&filter=' + filter + '&latitude=' + latitude + '&longitude=' + longitude + '&auth_token=' + authToken;
	
	    return fetch(url).then(function (r) {
	      return r.json();
	    });
	  },
	  login: function login(_ref3) {
	    var email = _ref3.email;
	    var password = _ref3.password;
	
	    if (email === undefined || password === undefined) {
	      throw new Error('Missing parameter');
	    }
	    var url = baseURL + '/login';
	    return fetch(url, {
	      method: 'post',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify({
	        email: email,
	        password: password
	      })
	    }).then(function (r) {
	      return r.json();
	    });
	  },
	  applicationContext: function applicationContext(authToken) {
	    var url = baseURL + '/application_context?application=Flywheel&' + 'platform=ios&version=5.6.7&platform_version=9.2.1&latitude=0&longitude=0&auth_token=' + authToken;
	    return fetch(url).then(function (r) {
	      return r.json();
	    });
	  }
	};
	
	exports.default = flywheel;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=flywheel.js.map