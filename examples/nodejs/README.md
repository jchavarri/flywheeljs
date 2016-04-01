# Examples: nodejs

This is a basic usage example of the flywheeljs library: order your Flywheel cabs from the command line.

## Get ready

Run `npm install` from the `examples/nodejs` folder.

## Common params

All commands share the following params:

- `-e <email>` (or `--email`) - the email used to register on Flywheel
- `-p <password>` (or `--password`) - the Flywheel password

## Commands

The app expect to be passed a command: `account`, `status`, `request` or `cancel`.

### Account

Prints the Flywheel account information.

Example: `node index.js account -e <email> -p <password>`

### Status

Prints a specific Flywheel ride status information.

Example: `node index.js status -e <email> -p <password> -r <rideId>`

Params:

- `-r <rideId>` (or `--rideId`) - the ride id

### Cancel

Cancel a specific Flywheel ride.

Example: `node index.js cancel -e <email> -p <password> -r <rideId>`

Params:

- `-r <rideId>` (or `--rideId`) - the ride id

### Request

Request a new ride at a specific location.

Example: `node index.js request -e <email> -p <password> -l <latitude> -L <longitude>`

Params:

- `--latitude='<latitude>'` - the latitude, in degrees
- `--latitude='<longitude>'` - the longitude, in degrees

**Warning** Please note the quotes around the `latitude` and `longitude` params. It's important to use this syntax in order to avoid errors while parsing the command. For example: `node index.js request -e <email> -p <password> --latitude='37.2241822' --longitude='-121.2572231'`

