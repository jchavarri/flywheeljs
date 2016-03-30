var flywheel = require('flywheeljs');
var program = require('commander');
var chalk = require('chalk');

program
  .description('A nodejs tool to manage cabs from Flywheel')
  .version('0.0.1')
  .option('-u, --username <username>', 'The user to authenticate as')
  .option('-p, --password <password>', 'The user\'s password')

program
  .command('account')
  .description('get information about your Flywheel account')
  .action(function(options){
    if (this.parent.username && this.parent.password) {
      flywheel.login({
        email: this.parent.username,
        password: this.parent.password
      })
      .then(function(response) {
        console.log(chalk.green('Success! 😀\nAuth token:\n', response.auth_token, '\nYour user information is:\n', JSON.stringify(response.passenger, null, '  ')));
      })
      .catch(function(error) {
        console.log(chalk.red('There was an error: ⚠️\n', JSON.stringify(error, null, '  ')));
      });
    }
    else {
      console.log('Missing values for <username> and <password>');
    }
  });

program
  .command('request')
  .description('request a new ride at a given location')
  .option('-l, --latitude <latitude>', 'The latitude to request at (in degrees)')
  .option('-L, --longitude <longitude>', 'The latitude to request at (in degrees)')
  .action(function(options){
    if (options.username && options.password) {
      flywheel.login({
        email: options.username,
        password: options.password
      })
      .then(function(response) {
        console.log(response.auth_token);
        console.log(response.passenger.id);
      })
      .catch(function(error) {
        console.log('There was an error', error);
      });
      console.log('user: %s pass: %s action: %s',
          options.username, options.password, action);
    }
  });

var generateRideFunction = function(name, description, flywheelFunction) {
  return program
  .command(name)
  .option('-r, --rideId <rideId>', 'The ride id to request status for')
  .description(description)
  .action(function(options){
    if (this.parent.username && this.parent.password && options.rideId) {
      flywheel.login({
        email: this.parent.username,
        password: this.parent.password
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
        console.log(error);
        console.log(chalk.red('There was an error:\n', JSON.stringify(error, null, '  ')));
      });
    }
    else {
      console.log('Missing params <username>, <password>, <rideId>');
    }
  });
}

generateRideFunction('status', 'get information about a Flywheel ride', flywheel.getRideStatus);
generateRideFunction('cancel', 'cancel a Flywheel ride', flywheel.cancelRide);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse(process.argv);
