import flywheel from '../../src/flywheel';
import {fixture} from '../setup/.fixture.json';

describe('flywheel', () => {

  var authToken;
  var userId;
  var serviceAvailabilitiesId;
  var rideId;

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
        expect(response.error).to.exist;
        done();
      })
      .catch(response => {
        expect(response.error).to.exist;
        done();
      });
    });
    it('should return an error if parameters are missing', () => {
      expect(() => flywheel.signup({})).to.throw(Error);
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
        expect(response.drivers).to.exist;
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
        expect(response.auth_token).to.exist;
        expect(response.passenger.id).to.exist;
        authToken = response.auth_token;
        userId = response.passenger.id;
        done();
      });
    });
    it('should return an error if parameters are missing', () => {
      expect(() => flywheel.login({})).to.throw(Error);
    });
  });

  describe('Application context function', () => {
    it('should return services availabilities id', (done) => {
      flywheel.applicationContext({
        authToken: authToken,
        latitude: fixture.latitude,
        longitude: fixture.longitude
      })
      .then(response => {
        expect(response.service_availabilities[0].id).to.exist;
        serviceAvailabilitiesId = response.service_availabilities[0].id;
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
        expect(response.payment_instruments).to.exist;
        done();
      });
    });
    it('should return an error if parameters are missing', () => {
      expect(() => flywheel.userInfo({})).to.throw(Error);
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
        expect(response.response[0].distance).to.exist;
        expect(response.response[0].duration).to.exist;
        done();
      });
    });
  });

  describe('Create ride function', () => {
    it('should fail without a payment token', (done) => {
      flywheel.createRide({
        pickUpLat: fixture.latitude,
        pickUpLon: fixture.longitude,
        address: fixture.address,
        state: fixture.state,
        country: fixture.country,
        city: fixture.city,
        passenger: {
          name: fixture.name,
          phone: fixture.telephone
        },
        paymentToken: '(null)',
        serviceAvailabilitiesId: serviceAvailabilitiesId,
        tip: 500,
        authToken: authToken
      })
      .then(response => {
        expect(response.id).to.exist;
        rideId = response.id;
        done();
      })
      .catch(response => {
        expect(response.additional_information.ride_id).to.exist;
        rideId = response.additional_information.ride_id;
        done();
      });
    });
    it('should return an error if parameters are missing', () => {
      expect(() => flywheel.createRide({})).to.throw(Error);
    });
  });

  describe('Get ride status function', () => {
    it('should fail if the ride doesn\'t exist', (done) => {
      flywheel.getRideStatus({
        rideId: rideId,
        authToken: authToken
      })
      .catch(response => {
        // expect(response.status).to.exist;
        done();
      });
    });
    it('should return an error if parameters are missing', () => {
      expect(() => flywheel.getRideStatus({})).to.throw(Error);
    });
  });

  describe('Cancel ride function', () => {
    it('should fail if the ride doesn\'t exist', (done) => {
      flywheel.cancelRide({
        rideId: rideId,
        authToken: authToken
      })
      .catch(response => {
        done();
      });
    });
    //   it('should return ride status=canceled', (done) => {
    //     flywheel.cancelRide({
    //       rideId: rideId,
    //       authToken: authToken
    //     })
    //     .then(response => {
    //       expect(response.status).to.equal('canceled');
    //       done();
    //     });
    //   });
    it('should return an error if parameters are missing', () => {
      expect(() => flywheel.cancelRide({})).to.throw(Error);
    });
  });

  // describe('Get ride status function', () => {
  //   it('should return ride status=canceled', (done) => {
  //     flywheel.getRideStatus({
  //       rideId: rideId,
  //       authToken: authToken
  //     })
  //     .then(response => {
  //       expect(response.status).to.equal('canceled');
  //       done();
  //     });
  //   });
  // });

});
