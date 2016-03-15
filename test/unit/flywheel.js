import flywheel from '../../src/flywheel';
import {fixture} from '../setup/.fixture.json';

describe('flywheel', () => {

  var authToken;

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
      .then(data => {
        expect(data.error).to.exist;
        authToken = data.auth_token;
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
      .then(data => {
        expect(data.drivers).to.exist;
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
      .then(data => {
        expect(data.auth_token).to.exist;
        authToken = data.auth_token;
        done();
      });
    });
  });

  describe('Application context function', () => {
    it('should return services availabilities', (done) => {
      flywheel.applicationContext(authToken)
      .then(data => {
        expect(data.service_availabilities).to.exist;
        done();
      });
    });
  });
});
