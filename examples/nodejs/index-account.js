const program = require('commander');
const chalk = require('chalk');
const flywheel = require('flywheeljs');

program
  .description('get information about your Flywheel account')
  .option('-e, --email <email>', '[required] The email of the user to authenticate as')
  .option('-p, --password <password>', '[required] The user\'s password')
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
else {
  if (program.email && program.password) {
    flywheel.login({
      email: program.email,
      password: program.password
    })
    .then(function(response) {
      console.log(chalk.green('Success! 😀\nAuth token:\n', response.auth_token, '\nYour user information is:\n', JSON.stringify(response.passenger, null, '  ')));
    })
    .catch(function(error) {
      console.log(chalk.red('There was an error: ⚠️\n', JSON.stringify(error, null, '  ')));
    });
  }
  else {
    console.log(chalk.yellow('Some of these params are missing: <email>, <password>. Use -h or --help to get some usage information'));
  }
}
