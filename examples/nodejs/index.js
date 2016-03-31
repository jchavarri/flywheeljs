const flywheel = require('flywheeljs');
const program = require('commander');
const chalk = require('chalk');

program
  .description('A nodejs tool to manage cabs from Flywheel')
  .version('0.0.1')

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
  .option('--latitude <latitude>', '[required] The latitude to request at (in degrees). Usage: --latitude=\'37.2241822\'')
  .option('--longitude <longitude>', '[required] The latitude to request at (in degrees). Usage: --longitude=\'-121.2572231\'')
  .action(function(options){
    var authToken = undefined;
    if (options.email && options.password && options.latitude && options.longitude) {
      flywheel.login({
        email: options.email,
        password: options.password
      })
      .then(function(response) {
        authToken = response.auth_token;
        return flywheel.applicationContext({
          authToken: authToken,
          latitude: options.latitude,
          longitude: options.longitude
        });
      })
      // .then(function(response) {
      //   return flywheel.createRide({
      //     pickUpLat: fixture.latitude,
      //     pickUpLon: fixture.longitude,
      //     passenger: {
      //       name: fixture.name,
      //       phone: fixture.telephone
      //     },
      //     paymentToken: '(null)',
      //     serviceAvailabilitiesId: serviceAvailabilitiesId,
      //     tip: 500,
      //     authToken: authToken
      //   });
      // })
      .then(function(response) {
        if (!response.service_availabilities) {
          throw new Error('There\'s no service available at those coordinates. Please check with another latitude and/or longitude');
        }
        var counter = 0;
        var maxTrials = 5;
        var timeBetweenTrials = 1 * 1000;
        const retry = function() {
          return new Promise(function (resolve) {
            setTimeout(resolve, timeBetweenTrials);
          })
          .then(function() {
            return flywheel.getRideStatus({
              authToken: authToken
            })
            .then(function(response) {
              counter++;
              if (counter == 3) {
                return response;
              }
              else if (!response.someRandom && counter < maxTrials) {
                console.log("⏳ Waiting for a driver to accept the ride. Remaining attempts: " + (maxTrials - counter));
                return retry();
              }
              else {
                throw new Error('Too much time went by without a driver accepting the ride. Please cancel your ride using the \'cancel\' command or open the Flywheel app on your phone to handle this ride from there.');
              }
            });
          });
          return retryPromise;
        }
        return retry();
      })
      .then(function(response) {
        console.log('There was a response', response);
      })
      .catch(function(error) {
        console.log(chalk.red('There was an error: ⚠️\n', error));
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
      console.log(chalk.yellow('Missing params <email>, <password>, <rideId>. Use -h or --help to get some usage information'));
    }
  });
}

generateRideFunction('status', 'get information about a Flywheel ride', flywheel.getRideStatus);
generateRideFunction('cancel', 'cancel a Flywheel ride', flywheel.cancelRide);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
