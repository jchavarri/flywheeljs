import axios from 'axios';

const ax = axios.create({
  baseURL: 'https://mobile.flywheel.com',
});

const _verifyRequiredParams = function(params) {
  const missingParams = [];
  Object.keys(params).forEach(function(key) {
    if (!params[key]) {
      missingParams.push(key);
    }
  });
  if (missingParams.length > 0) {
    throw new Error('Missing parameters: ' + missingParams);
  }
};

const _authorizedGetRequest = function(requiredParams, path, authToken) {
  _verifyRequiredParams(requiredParams);
  return ax.get(path, {
    params: {
      auth_token: authToken
    }
  });
};

const flywheel = {

  /**
   * Register a new user on the Flywheel service
   *
   * @example
   * flywheel.signup({
   *   firstName: 'John',
   *   email: 'john@doe.com',
   *   password: 'johndoe123',
   *   telephone: 'johndoe123',
   *   latitude: 37.615223,
   *   longitude: -122.389977
   * })
   * .then(response => {
   *   console.log(response.data.passenger);
   * })
   * .catch(response => {
   *   console.log(response.data.error);
   * });
   * @param {Object} $0 - Options object parameter
   * @param {String} $0.firstName - Flywheel user first name
   * @param {String} $0.email - Flywheel user email
   * @param {String} $0.password - Flywheel user password
   * @param {String} $0.telephone - Flywheel user phone number
   * @param {Number} [$0.latitude=0] - Default latitude (in degrees). This value can be overriden when ordering a cab
   * @param {Number} [$0.longitude=0] - Default longitude (in degrees). This value can be overriden when ordering a cab
   * @return {Object} signup - An object containing:
   * @return {String} signup.auth_token - The token that can be used for future requests
   * @return {Object} signup.passenger - An object including the user information. Some relevant fields are: `id`, `first_name`, `last_name`, and `email`.
  */
  signup({firstName, email, password, telephone, latitude=0, longitude=0} = {}) {
    _verifyRequiredParams({firstName, email, password, telephone});
    return ax.post('/passengers', {
      first_name: firstName,
      email: email,
      password: password,
      telephone: telephone,
      latitude: latitude,
      longitude: longitude,
      adjust_xid_type: 'idfa',
      adjust_xid: '12345678-1234-1234-1234-123456789012',
      persistent_device_id: '12345678-1234-1234-1234-123456789012'
    });
  },

  /**
   * Search cabs
   *
   * @param {Object} $0 - Options object parameter
   * @param {String} [$0.by='location'] - The field to search by
   * @param {String} [$0.filter='hailable'] - A filter to be applied to the search request
   * @param {Number} [$0.latitude=0] - Default latitude (in degrees) used when ordering cabs
   * @param {Number} [$0.longitude=0] - Default longitude (in degrees) used when ordering cabs
   * @param {Number} [$0.authToken='(null)'] - User authentication token (if she's logged)
   * @return {Object} search - An object containing:
   * @return {Array} search.drivers - Array containing the drivers available at that location. Some relevant fields are: `id`, `vehicle`, `latitude` and `longitude`.
  */
  search({by='location', filter='hailable', latitude=0, longitude=0, authToken='(null)'} = {}) {
    return ax.get('/search', {
      params: {
        by: by,
        filter: filter,
        latitude: latitude,
        longitude: longitude,
        auth_token: authToken
      }
    });
  },

  /**
   * Login a user
   *
   * @param {Object} $0 - Options object parameter
   * @param {String} $0.email - The user email
   * @param {String} $0.password - The user password
   * @return {Object} login - An object containing:
   * @return {String} login.auth_token - The authentication token that can be used in subsequent requests
   * @return {Object} login.passenger - An object including the user information. Some relevant fields are: `id`, `first_name`, `last_name`, and `email`.
   * @return {Array} login.scheduled_rides - Array containing the user scheduled rides
  */
  login({email, password}) {
    _verifyRequiredParams({email, password});
    return ax.post('/login', {
      email: email,
      password: password
    });
  },

  /**
   * Get application context given a specific location.
   *
   * @param {Object} $0 - Options object parameter
   * @param {String} $0.authToken - An authentication token
   * @param {Number} $0.latitude - A given latitude (in degrees) used when ordering cabs
   * @param {Number} $0.longitude - A given longitude (in degrees) used when ordering cabs
   * @return {Object} applicationContext - An object containing the application context. The most interesting fields returned are:
   * @return {Array} applicationContext.service_availabilities - An array of the services available at the given location. The service 'id' parameter is required for other requests (createRide, for example)
   * @return {Object} applicationContext.on_board_cancellation_window - The amount of time (in secs) allowed to cancel a ride without being charged
  */
  applicationContext({authToken, latitude=0, longitude=0}) {
    return ax.get('/application_context', {
      params: {
        application: 'Flywheel',
        platform: 'ios',
        version: '5.6.7',
        platform_version: '9.2.1',
        latitude: latitude,
        longitude: longitude,
        auth_token: authToken
      }
    });
  },

  /**
   * Get user info
   *
   * @param {Object} $0 - Options object parameter
   * @param {String} $0.userId - The user id (you can obtain it from the 'passenger' object after logging in)
   * @param {String} $0.authToken - The authentication token
   * @return {Object} userInfo - An object containing the user information. The most interesting fields returned are:
   * @return {String} userInfo.id - The user (passenger) id
   * @return {Array} userInfo.payment_instruments - An array with the payment instruments allowed by the user. The most useful field of each payment instrument is 'token'
  */
  userInfo({userId, authToken}) {
    return _authorizedGetRequest({userId, authToken}, '/passengers/' + userId, authToken);
  },

  /**
   * Get estimated time of arrival
   *
   * @param {Object} $0 - Options object parameter
   * @param {String} $0.origin - The user id (you can obtain it from the 'passenger' object after logging in)
   * @param {String} $0.authToken - The authentication token
   * @return {Object} eta - An object containing the eta information. The fields returned are:
   * @return {String} eta.status - "OK" if the location can be reached
   * @return {Array} eta.response - An array that contains at least one object with the estimated durations. It has the following properties: 'duration' (in secs), 'duration_in_traffic' (in secs) and 'distance'
  */
  eta({origin, destination, authToken}) {
    _verifyRequiredParams({origin, destination, authToken});
    return ax.get('/eta', {
      params: {
        origins: origin,
        destinations: destination,
        auth_token: authToken
      }
    });
  },

  /**
   * Create a new request for a ride
   *
   * @param {Object} $0 - Options object parameter
   * @param {Number} $0.pickUpLat - Pickup latitude (in degrees)
   * @param {Number} $0.pickUpLon - Pickup latitude (in degrees)
   * @param {Object} $0.passenger - The passenger object. Only 'name' (String) and 'telephone' (String) are required
   * @param {String} $0.serviceAvailabilitiesId - The service id. It can be obtained using `applicationContext()`
   * @param {Number} $0.tip - The ride tip (in cents)
   * @param {String} $0.authToken - The authentication token
   * @param {String} $0.notes - Any notes to be sent to the cab driver
   * @return {MyType} ride - An object containing the eta information. The fields returned are:
  */
  createRide({pickUpLat, pickUpLon, passenger, paymentToken, serviceAvailabilitiesId, tip=500, authToken='(null)', notes=''}) {
    _verifyRequiredParams({pickUpLat, pickUpLon, passenger, paymentToken, serviceAvailabilitiesId});
    const clientCreatedAt = new Date().toISOString().replace(/T/g,'-').slice(0, -5);
    return ax.post('/rides', {
      source: 'Mobile:iOS:5.6.7:Flywheel',
      pick_up_location: {
        latitude: pickUpLat,
        longitude: pickUpLon
      },
      guaranteed_tip_details: {
        type: 'cents',
        amount: tip
      },
      notes: notes,
      requirements: {service_availability_ids: [serviceAvailabilitiesId]},
      passenger: passenger,
      auth_token: authToken,
      payment_instrument: {
        token: paymentToken
      },
      client_created_at: clientCreatedAt
    });
  },

  getRideStatus({rideId, authToken}) {
    return _authorizedGetRequest({rideId, authToken}, '/rides/' + rideId, authToken);
  },

  cancelRide({rideId, authToken}) {
    _verifyRequiredParams({rideId, authToken});
    return ax.post('/rides/' + rideId + '/cancellation_contract', {
      auth_token: authToken
    })
    .then(response => {
      const url = ridesUrl + rideId;
      return ax.put(url, {
        status: 'canceled',
        auth_token: authToken
      });
    });
  },

};

export default flywheel;
