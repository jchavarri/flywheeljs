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

/**
 * This is the main function
*/
const flywheel = {

  /**
   * @param {String} [firstName] the first param
   * @param {String} [email] the second param
   * @returns {String} the result
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
   * @param {String} [by] The field to search by
   * @param {String} [filter] A filter to be applied to the search request
   * @returns {Object} An object
  */
  search({by='location', filter='hailable', latitude=0, longitude=0, authToken='(null)'}) {
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
