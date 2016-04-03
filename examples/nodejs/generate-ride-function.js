const program = require('commander');
const chalk = require('chalk');
const flywheel = require('flywheeljs');

exports.generateRideFunction = function(name, description, flywheelFunction) {

  program
  .description(description)
  .option('-r, --rideId <rideId>', '[required] The ride id to request status for')
  .option('-e, --email <email>', '[required] The email of the user to authenticate as')
  .option('-p, --password <password>', '[required] The user\'s password')
  .parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
  else {
    if (program.email && program.password && program.rideId) {
      flywheel.login({
        email: program.email,
        password: program.password
      })
      .then(function(response) {
        return flywheelFunction({
          rideId: program.rideId,
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
  }

}
