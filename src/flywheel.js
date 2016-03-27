import axios from 'axios';

const ax = axios.create({
  baseURL: 'https://mobile.flywheel.com',
});

// We pass the data to the promises objects, not the status, headers and config
ax.interceptors.response.use(function(response) {
  return response.data;
}, function(error) {
  return Promise.reject(error.data);
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

/**
The flywheeljs library main exported object
@namespace {object} flywheel
*/
const flywheel = {

  /**
   * The type of the object returned with a successfully resolved signup promise.
   * @name SignupPromise
   * @typedef {object} SignupPromise
   * @property {string} auth_token - The token that can be used to authenticate future requests
   * @property {object} passenger - An object including the user information. Some relevant fields are: `id`, `first_name`, `last_name`, and `email`.
   */
  /**
   * Sign up a new user for the Flywheel service
   *
   * @example
   * flywheel.signup({
   *   firstName: 'John',
   *   email: 'john@doe.com',
   *   password: 'johndoe123',
   *   telephone: '123123123',
   *   latitude: 37.615223,
   *   longitude: -122.389977
   * })
   * .then(response => {
   *   console.log(response.data.passenger);
   * })
   * .catch(response => {
   *   console.log(response.data.error);
   * });
   * @param {object} options - Options object parameter
   * @param {string} options.firstName - Flywheel user first name
   * @param {string} options.email - Flywheel user email
   * @param {string} options.password - Flywheel user password
   * @param {string} options.telephone - Flywheel user phone number
   * @param {number} [options.latitude=0] - Default latitude (in degrees). This value can be overriden when ordering a cab
   * @param {number} [options.longitude=0] - Default longitude (in degrees). This value can be overriden when ordering a cab
   * @return {Promise} A promise that returns {@link SignupPromise} if resolved and an object containing the error if rejected.
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
   * The type of the object returned with a successfully resolved search promise.
   * @name SearchPromise
   * @typedef {object} SearchPromise
   * @property {array} drivers - An array containing the drivers available at that location. Some relevant fields are: `id`, `vehicle`, `latitude` and `longitude`.
   */
  /**
   * Search for cabs around a given position
   *
   * @param {object} options - Options object parameter
   * @param {string} [options.by='location'] - The field to search by
   * @param {string} [options.filter='hailable'] - A filter to be applied to the search request
   * @param {number} [options.latitude=0] - Default latitude (in degrees) used when ordering cabs
   * @param {number} [options.longitude=0] - Default longitude (in degrees) used when ordering cabs
   * @param {number} [options.authToken='(null)'] - User authentication token (if she's logged)
   * @return {Promise} A promise that returns {@link SearchPromise} if resolved and an object containing the error if rejected.
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
   * The type of the object returned with a successfully resolved login promise.
   * @name LoginPromise
   * @typedef {object} LoginPromise
   * @property {string} auth_token - The token that can be used to authenticate future requests
   * @property {object} passenger - An object including the user information. Some relevant fields are: `id`, `first_name`, `last_name`, and `email`.
   * @property {object} scheduled_rides - An array containing the user scheduled rides
   */
  /**
   * Login a user
   *
   * @param {object} options - Options object parameter
   * @param {string} options.email - The user email
   * @param {string} options.password - The user password
   * @return {Promise} A promise that returns {@link LoginPromise} if resolved and an object containing the error if rejected.
  */
  login({email, password}) {
    _verifyRequiredParams({email, password});
    return ax.post('/login', {
      email: email,
      password: password
    });
  },

  /**
   * The type of the object returned with a successfully resolved application context promise. I added a question mark on those properties that are not clear to me.
   * @name ApplicationContextPromise
   * @typedef {object} ApplicationContextPromise
   * @property {array} service_availabilities - An array of the services available at the given location. The service 'id' parameter is required for other requests (createRide, for example)
   * @property {object} on_board_cancellation_window - The amount of time (in secs) allowed to cancel a ride without being charged
   * @property {object} application_details - Some applications details, like the url on the app store
   * @property {number} flywheel_service_fee - The fee charged by flywheel (in cents)
   * @property {number} hailing_distance - Max hailing distance in meters (?)
   * @property {number} maximum_hail_time - Max hail time in secs (before a request fails?)
   * @property {number} straight_line_approximation_speed - ?
   * @property {array} points_of_interest - ?
   * @property {array} alerts - ?
   * @property {number} on_board_cancellation_window - The amount of time (in secs) where a cancellation is not charged (?)
   * @property {number} gps_warning_distance - ?
   * @property {string} preferred_eta_provider - ?
   * @property {number} booked_ride_countdown_window - ?
   * @property {object} invite_friends - Referral rewards (in cents)
   * @property {string} time_zone_identifier - Time zone
   * @property {number} utc_offset - Offset (in secs) from UTC time
   * @property {string} share_eta_msg - Some string used in the app UI
   * @property {bool} enable_asking_point - ?
  */
  /**
   * Get some application context data given a specific location.
   *
   * @param {object} options - Options object parameter
   * @param {string} options.authToken - An authentication token
   * @param {number} options.latitude - A given latitude (in degrees) used when ordering cabs
   * @param {number} options.longitude - A given longitude (in degrees) used when ordering cabs
   * @return {Promise} A promise that returns {@link ApplicationContextPromise} if resolved and an object containing the error if rejected.
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
   * The type of the object returned with a successfully resolved user info promise. I added a question mark on those properties that are not clear to me.
   * @name UserInfoPromise
   * @typedef {object} UserInfoPromise
   * @property {string} id - The user (passenger) id
   * @property {string} first_name - The user first name
   * @property {string} last_name - The user last name
   * @property {string} email - The user email
   * @property {bool} has_dummy_email - True if the user has a dummy email (whatever that might mean)
   * @property {string} telephone - The user telephone
   * @property {string} canonical_telephone - ?
   * @property {array} addresses - The user addresses
   * @property {array} mobile_devices - The user mobile devices
   * @property {array} dispatch_service_accounts - ?
   * @property {number} default_tip_percent - Default tip percentage
   * @property {number} credit_balance - ?
   * @property {number} credits_since_last_session - ?
   * @property {array} payment_instruments - The payment instruments linked to this user. The payment object contains a property `token` that is required for creating rides
   * @property {number} payment_instruments_count - Number of payment instruments
   * @property {string} latest_ride_id - Latest ride id
   * @property {string} referral_code - Referral code for this user
   * @property {string} latest_ride_id - Latest ride id
   * @property {array} nonfatal_errors - ?
   * @property {array} disabled_features - ?
   * @property {string} oauth_id - ?
   * @property {string} oauth_provider - I guess Google, FB, etc.
   * @property {bool} sms_verification_required - ?
   * @property {bool} is_agent_also - ?
   * @property {string} added_by - ?
   * @property {array} special_characteristics - ?
   * @property {bool} ivr_blocked - ?
   * @property {bool} newly_added - ?
   * @property {object} suspended_upto - ?
  */
  /**
   * Get user info
   *
   * @param {object} options - Options object parameter
   * @param {string} options.userId - The user id. It can be obtained from the 'passenger' object after logging in
   * @param {string} options.authToken - The authentication token
   * @return {Promise} A promise that returns {@link UserInfoPromise} if resolved and an object containing the error if rejected.
  */
  userInfo({userId, authToken}) {
    return _authorizedGetRequest({userId, authToken}, '/passengers/' + userId, authToken);
  },

  /**
   * The type of the object returned with a successfully resolved search promise.
   * @name ETAPromise
   * @typedef {object} ETAPromise
   * @property {string} status - "OK" if the location can be reached
   * @property {array} response - An array that contains at least one object with the estimated durations. It has the following properties: 'duration' (in secs), 'duration_in_traffic' (in secs) and 'distance'
   */
  /**
   * Get estimated time of arrival
   *
   * @param {object} options - Options object parameter
   * @param {string} options.origin - The user id. It can be obtained from the 'passenger' object after logging in)
   * @param {string} options.authToken - The authentication token
   * @return {Promise} A promise that returns {@link ETAPromise} if resolved and an object containing the error if rejected.
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
   * The type of the object returned with a successfully resolved ride promise. It includes a lot of properties, only the most interesting ones are documented here.
   * @name RidePromise
   * @typedef {object} RidePromise
   * @property {string} id - The ride id
   * @property {string} notes - The notes attached to the ride, created by the user
   * @property {string} status - `hailing` if the ride is still to be assigned, `hail_accepted` if a cab driver accepted the ride, `canceled` if it's been canceled
   * @property {string} failure_reason - The reason why the ride failed, if any
   * @property {string} client_created_at - Formatted creation date
   * @property {number} created_at - Creation timestamp
   * @property {number} updated_at - The reason why the ride failed
   * @property {object} passenger - An object with the same structure than {@link UserInfoPromise}
   * @property {object} pick_up_location - Pick up location
   * @property {object} drop_off_location - Drop off location (can be empty)
   * @property {object} hail - This object contains all details about the `hail`, including the driver information
   * @property {object} payment_instrument - The payment instrument used to pay for this ride
   */
  /**
   * Create a new request for a ride
   *
   * @param {object} options - Options object parameter
   * @param {number} options.pickUpLat - Pickup latitude (in degrees)
   * @param {number} options.pickUpLon - Pickup latitude (in degrees)
   * @param {object} options.passenger - The passenger object. Only 'name' (string) and 'telephone' (string) are required
   * @param {string} options.serviceAvailabilitiesId - The service id. It can be obtained using `applicationContext()`
   * @param {number} options.tip - The ride tip (in cents)
   * @param {string} options.authToken - The authentication token
   * @param {string} options.notes - Any notes to be sent to the cab driver
   * @return {Promise} A promise that returns {@link RidePromise} if resolved and an object containing the error if rejected.
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

  /**
   * Get the status of a specific ride
   *
   * @param {object} options - Options object parameter
   * @param {number} options.rideId - The ride id
   * @param {number} options.authToken - The authentication token
   * @return {Promise} A promise that returns {@link RidePromise} if resolved and an object containing the error if rejected.
  */
  getRideStatus({rideId, authToken}) {
    return _authorizedGetRequest({rideId, authToken}, '/rides/' + rideId, authToken);
  },

  /**
   * Cancel a specific ride
   *
   * @param {object} options - Options object parameter
   * @param {number} options.rideId - The ride id
   * @param {number} options.authToken - The authentication token
   * @return {Promise} A promise that returns {@link RidePromise} if resolved and an object containing the error if rejected.
  */
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
