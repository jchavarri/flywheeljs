import flywheel from '../../src/flywheel';
import {fixture} from '../setup/.fixture.json';

describe('flywheel', () => {

  var authToken;
  var userId;

  describe('Signup function', () => {
    it('should return an error when the user exists', (done) => {
      flywheel.signup({
        firstName: fixture.firstName,
        email: fixture.email,
        password: fixture.password,
        telephone: fixture.telephone,
        latitude: fixture.latitude,
        longitude: fixture.longitude
      })
      .then(response => {
        expect(response.data.error).to.exist;
        done();
      })
      .catch(response => {
        expect(response.data.error).to.exist;
        done();
      });
    });
  });

  describe('Search function', () => {
    beforeEach(() => {
      // spy(flywheel, 'greet');
    });

    it('should return a drivers array', (done) => {
      flywheel.search({
        latitude: fixture.latitude,
        longitude: fixture.longitude
      })
      .then(response => {
        expect(response.data.drivers).to.exist;
        done();
      });
    });
  });

  describe('Login function', () => {
    it('should return a token', (done) => {
      flywheel.login({
        email: fixture.email,
        password: fixture.password
      })
      .then(response => {
        expect(response.data.auth_token).to.exist;
        expect(response.data.passenger.id).to.exist;
        authToken = response.data.auth_token;
        userId = response.data.passenger.id;
        done();
      });
    });
  });

  describe('Application context function', () => {
    it('should return services availabilities', (done) => {
      flywheel.applicationContext({
        authToken: authToken
      })
      .then(response => {
        expect(response.data.service_availabilities).to.exist;
        done();
      });
    });
  });

  describe('User info function', () => {
    it('should return payment instruments', (done) => {
      flywheel.userInfo({
        userId: userId,
        authToken: authToken
      })
      .then(response => {
        expect(response.data.payment_instruments).to.exist;
        done();
      });
    });
  });

  describe('ETA function', () => {
    it('should return duration and distance', (done) => {
      flywheel.eta({
        origin: fixture.origin,
        destination: fixture.destination,
        authToken: authToken
      })
      .then(response => {
        expect(response.data.response[0].distance).to.exist;
        expect(response.data.response[0].duration).to.exist;
        done();
      });
    });
  });
});
