import axios from 'axios';

const baseURL = 'https://mobile.flywheel.com';

const flywheel = {

  signup({firstName, email, password, telephone, latitude=0, longitude=0}) {
    if (firstName === undefined || email === undefined || password === undefined || telephone === undefined) {
      throw new Error('Missing parameter');
    }

    const url = baseURL + '/passengers';

    return axios.post(url, {
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

  search({by='location', filter='hailable', latitude=0, longitude=0, authToken='(null)'}) {
    const url = baseURL + '/search';
    return axios.get(url, {
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
    if (email === undefined || password === undefined) {
      throw new Error('Missing parameter');
    }
    const url = baseURL + '/login';
    return axios.post(url, {
      email: email,
      password: password
    });
  },

  applicationContext({authToken}) {
    const url = baseURL + '/application_context';
    return axios.get(url, {
      params: {
        application: 'Flywheel',
        platform: 'ios',
        version: '5.6.7',
        platform_version: '9.2.1',
        latitude: 0,
        longitude: 0,
        auth_token: authToken
      }
    });
  },

  userInfo({userId, authToken}) {
    const url = baseURL + '/passengers/' + userId;
    return axios.get(url, {
      params: {
        auth_token: authToken
      }
    });
  },

  eta({origin, destination, authToken}) {
    const url = baseURL + '/eta';
    return axios.get(url, {
      params: {
        origins: origin,
        destinations: destination,
        auth_token: authToken
      }
    });
  }

};

export default flywheel;
