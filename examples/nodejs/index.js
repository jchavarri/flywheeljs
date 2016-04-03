const program = require('commander');
const chalk = require('chalk');
const axios = require('axios');
// const flywheel = require('flywheeljs');
const flywheel = require('../../dist/flywheel');
const mergeObjects = require('./utils').mergeObjects;
const readline = require('readline');

program
  .description('A nodejs tool to manage ordering taxis using the Flywheel API')
  .version('0.0.2')

program
  .command('account')
  .description('get information about your Flywheel account')
  .option('-e, --email <email>', '[required] The email of the user to authenticate as')
  .option('-p, --password <password>', '[required] The user\'s password')
  .action(function(options){
    if (options.email && options.password) {
      flywheel.login({
        email: options.email,
        password: options.password
      })
      .then(function(response) {
        console.log(chalk.green('Success! 😀\nAuth token:\n', response.auth_token, '\nYour user information is:\n', JSON.stringify(response.passenger, null, '  ')));
      })
      .catch(function(error) {
        console.log(chalk.red('There was an error: ⚠️\n', JSON.stringify(error, null, '  ')));
      });
    }
    else {
      console.log(chalk.yellow('Missing values for <email> and <password>'));
    }
  });

program
  .command('request')
  .description('request a new ride at a given location')
  .option('-e, --email <email>', '[required] The email of the user to authenticate as')
  .option('-p, --password <password>', '[required] The user\'s password')
  .option('-a, --address <address>', '[required] The address to request the taxi at. Usage: --address \'22 Estate Ct, South San Francisco, CA\'')
  .option('-t, --tip <tip>', '[optional] The tip for the ride, in cents. For example, for the minimum amount ($5) the param should be \'--tip 500\'')
  .option('-n, --notes <notes>', '[optional] Some notes to add to the ride request. Use it with quotes: --notes \'Park below the white building\'')
  .option('-s, --skip', '[optional] Skip address confirmation step')
  .action(function(options){
    const tip = options.tip || 500;
    const notes = options.notes || '';
    var authToken = undefined;
    var passenger = undefined;

    if (options.email && options.password && options.address) {
      var addressData = {}; // Will fill this object with google geocoding results
      const googleUrl = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(options.address);
      axios.get(googleUrl)
      .then(function (response) {
        const results = response.data.results;
        if (!results || results.length === 0) {
          return Promise.reject('We couldn\'t find any addresses corresponding to \'' + options.address + '\'. Use a comma separated format including the state, for example: --address \'22 Estate Ct, South San Francisco, CA\'');
        }
        const googleData = results[0];
        locationData = {
          pickUpLat: googleData.geometry.location.lat,
          pickUpLon: googleData.geometry.location.lng,
          address: googleData.address_components
            .filter((el) => (el.types.indexOf('street_number') !== -1 || el.types.indexOf('route') !== -1))
            .reduce((prev, next) => prev + (prev.length === 0 ? '' : ' ') + next.short_name, ''),
          state: googleData.address_components
            .filter((el) => el.types.indexOf('administrative_area_level_1') !== -1)
            .reduce((prev, next) => next.short_name, ''),
          country: googleData.address_components
            .filter((el) => el.types.indexOf('country') !== -1)
            .reduce((prev, next) => next.long_name, ''),
          city: googleData.address_components
            .filter((el) => el.types.indexOf('locality') !== -1)
            .reduce((prev, next) => next.long_name, '')
        };
        if (!options.skip) {
          return new Promise((resolve, reject) => {
            const rl = readline.createInterface({
              input: process.stdin,
              output: process.stdout
            });
            rl.question('\nEverything ready! A taxi will be ordered to pick you up at this address:\n' +
              JSON.stringify(locationData, null, '  ') +
              '\n\nAre you sure you want to continue? (Y/n)',
              (yesno) => {
                rl.close();
                if (yesno.length === 0 || yesno.toLowerCase() === 'y' || yesno.toLowerCase() === 'yes')
                  resolve();
                else
                  reject('The request was canceled by user');
              });
          });
        }
      })
      .then(function() {
        return flywheel.login({
          email: options.email,
          password: options.password
        });
      })
      .then(function(response) {
        authToken = response.auth_token;
        passenger = response.passenger;
        return flywheel.applicationContext({
          authToken: authToken,
          latitude: locationData.pickUpLat,
          longitude: locationData.pickUpLon
        });
      })
      .then(function(response) {
        if (!response.service_availabilities || response.service_availabilities.length === 0) {
          return Promise.reject('Flywheel is not available at this address. Please check with another address, or try to add more information to it (postal code, state, city)');
        }
        if (!passenger.payment_instruments || passenger.payment_instruments.length === 0) {
          return Promise.reject('There are no payment instruments linked to this account. Please add a payment instrument from the Flywheel mobile app');
        }
        return flywheel.createRide(mergeObjects(locationData, {
          passenger: {
            name: passenger.name,
            phone: passenger.telephone
          },
          paymentToken: passenger.payment_instruments[0].token,
          serviceAvailabilitiesId: response.service_availabilities[0].id,
          tip: tip,
          notes: notes,
          authToken: authToken
        }));
      })
      .then(function(response) {
        console.log(chalk.green('👍  Your request has been created! Your ride id is: ' + response.id));
        var counter = 0;
        const timeout = 120;
        const timeBetweenTrials = 2;
        const maxTrials = timeout / timeBetweenTrials;
        const retry = function() {
          return new Promise(function (resolve) {
            setTimeout(resolve, timeBetweenTrials * 1000);
          })
          .then(function() {
            return flywheel.getRideStatus({
              authToken: authToken,
              rideId: response.id
            })
            .then(function(response) {
              counter++;
              if (response.status === 'hail_accepted') {
                return response;
              }
              else if (!response.someRandom && counter < maxTrials) {
                console.log(chalk.green('⏳  Waiting for a driver to accept the ride. Remaining attempts: ' + (maxTrials - counter)));
                return retry();
              }
              else {
                return Promise.reject('Too much time went by without a driver accepting the ride. Please cancel your ride using the \'cancel\' command or open the Flywheel app on your phone to handle this ride from there.');
              }
            });
          });
          return retryPromise;
        }
        return retry();
      })
      .then(function(response) {
        console.log(chalk.green('🚕  Yay!! Your request has been accepted. These are the details of your ride and driver:\nid: ' + response.id + '\nride data: ', JSON.stringify(response.hail, null, '  ')));
      })
      .catch(function(error) {
        console.log(chalk.red('There was an error: ⚠️\n', JSON.stringify(error, null, '  ')));
      });
    }
    else {
      console.log(chalk.yellow('Some of these params are missing: <email>, <password>, <latitude>, <longitude>. Use -h or --help to get some usage information'));
    }
  });

var generateRideFunction = function(name, description, flywheelFunction) {
  return program
  .command(name)
  .description(description)
  .option('-r, --rideId <rideId>', '[required] The ride id to request status for')
  .option('-e, --email <email>', '[required] The email of the user to authenticate as')
  .option('-p, --password <password>', '[required] The user\'s password')
  .action(function(options){
    if (options.email && options.password && options.rideId) {
      flywheel.login({
        email: options.email,
        password: options.password
      })
      .then(function(response) {
        return flywheelFunction({
          rideId: options.rideId,
          authToken: response.auth_token
        });
      })
      .then(function(response) {
        console.log(chalk.green('Success! 🚕\nYour ride information is:\n', JSON.stringify(response, null, '  ')));
      })
      .catch(function(error) {
        console.log(chalk.red('There was an error: ⚠️\n', JSON.stringify(error, null, '  ')));
      });
    }
    else {
      console.log(chalk.yellow('Some of these params are missing: <email>, <password>, <rideId>. Use -h or --help to get some usage information'));
    }
  });
}

generateRideFunction('status', 'get information about a Flywheel ride', flywheel.getRideStatus);
generateRideFunction('cancel', 'cancel a Flywheel ride', flywheel.cancelRide);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
