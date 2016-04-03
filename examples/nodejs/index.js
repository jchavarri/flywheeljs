const program = require('commander');

program
  .description('A nodejs tool to order taxis and manage your account using the Flywheel API')
  .version('0.0.2')
  .command('account <args>', 'get information about your Flywheel account')
  .command('request <args>', 'request a new ride at a given location')
  .command('cancel <args>', 'cancel a Flywheel ride')
  .command('status <args>', 'get information about a Flywheel ride')
  .parse(process.argv);
