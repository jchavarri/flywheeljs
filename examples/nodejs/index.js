const flywheel = require('flywheeljs');
const program = require('commander');
const chalk = require('chalk');

const untilSuccess = function(executor){
  // From http://stackoverflow.com/a/35782428/617787
  var beforeRetry = undefined;
  var outerExecutor = function(succeed, reject){
    var rejection_handler = function(err){
      if(beforeRetry){
        try {
          var preRetryResult = beforeRetry(err);
          if(preRetryResult) {
            return succeed(preRetryResult);
          }
        } catch (preRetryError) {
          return reject(preRetryError);
        }
      }
      return new Promise(executor).then(succeed, rejection_handler);
    }
    return new Promise(executor).then(succeed, rejection_handler);
  }

  var outerPromise = new Promise(outerExecutor);
  outerPromise.beforeRetry = function(func){
    beforeRetry = func;
    return outerPromise;
  }
  return outerPromise;
};

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
    if (this.parent.username && this.parent.password) {
      flywheel.login({
        email: this.parent.username,
        password: this.parent.password
      })
      .then(function(response) {
        console.log(response.auth_token);
        console.log(response.passenger.id);
        var counter = 0;
        const task = function(succ, reject){
          setTimeout(function(){
            if(++counter < 5)
              reject(counter + " is too small!!");
            else
              succ(counter + " is just right");
          }, 500); // simulated async task
        }
        return untilSuccess(task).beforeRetry(function(err){
          console.log("failed attempt: " + err);
        });

        // return flywheel.createRide({
        //   pickUpLat: fixture.latitude,
        //   pickUpLon: fixture.longitude,
        //   passenger: {
        //     name: fixture.name,
        //     phone: fixture.telephone
        //   },
        //   paymentToken: '(null)',
        //   serviceAvailabilitiesId: serviceAvailabilitiesId,
        //   tip: 500,
        //   authToken: authToken
        // });
      })
      .catch(function(error) {
        console.log('There was an error', error);
      });
    }
    else {
      console.log('Some of these params are missing: <username>, <password>, <latitude>, <longitude>');
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
