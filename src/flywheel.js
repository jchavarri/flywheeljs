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
   *   latitude: 37.7,
   *   longitude: -122.4
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
   * @param {Number} [$0.latitude=0] - Default latitude (in degrees) used when ordering cabs
   * @param {Number} [$0.longitude=0] - Default longitude (in degrees) used when ordering cabs
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
   * @param {String} [$0.by='location'] The field to search by
   * @param {String} [$0.filter='hailable'] A filter to be applied to the search request
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

  login({email, password}) {
    _verifyRequiredParams({email, password});
    return ax.post('/login', {
      email: email,
      password: password
    });
  },

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

  userInfo({userId, authToken}) {
    _verifyRequiredParams({userId, authToken});
    return ax.get('/passengers/' + userId, {
      params: {
        auth_token: authToken
      }
    });
  },

  eta({origin, destination, authToken}) {
    return ax.get('/eta', {
      params: {
        origins: origin,
        destinations: destination,
        auth_token: authToken
      }
    });
  },

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
    _verifyRequiredParams({rideId, authToken});
    return ax.get('/rides/' + rideId, {
      params: {
        auth_token: authToken
      }
    });
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
