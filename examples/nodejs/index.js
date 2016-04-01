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
  .option('-t, --tip <tip>', '[optional] The tip for the ride, in cents. For example, for the minimum amount ($5) the param should be \'--tip 500\'')
  .option('-n, --notes <notes>', '[optional] Some notes to add to the ride request. Use it with quotes: --notes \'Park below the white building\'')
  .action(function(options){
    const tip = options.tip || 500;
    const notes = options.notes || '';
    var authToken = undefined;
    var passenger = undefined;
    if (options.email && options.password && options.latitude && options.longitude) {
      flywheel.login({
        email: options.email,
        password: options.password
      })
      .then(function(response) {
        authToken = response.auth_token;
        passenger = response.passenger;
        return flywheel.applicationContext({
          authToken: authToken,
          latitude: options.latitude,
          longitude: options.longitude
        });
      })
      .then(function(response) {
        if (!response.service_availabilities || response.service_availabilities.length === 0) {
          throw new Error('There\'s no service available at those coordinates. Please check with another latitude and/or longitude');
        }
        if (!passenger.payment_instruments || passenger.payment_instruments.length === 0) {
          throw new Error('There are no payment instruments linked to this account. Please add a payment instrument from the Flywheel mobile app');
        }
        return flywheel.createRide({
          pickUpLat: options.latitude,
          pickUpLon: options.longitude,
          passenger: {
            name: passenger.name,
            phone: passenger.telephone
          },
          paymentToken: passenger.payment_instruments[0].token,
          serviceAvailabilitiesId: response.service_availabilities[0].id,
          tip: tip,
          notes: notes,
          authToken: authToken
        });
      })
      .then(function(response) {
        console.log("🚕  Your request has been created! Your ride id is: " + response.id);
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
        console.log('🔝🔝 Yay!! Your request has been accepted. These are the details:\n', response);
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
