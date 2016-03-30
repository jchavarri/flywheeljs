# Examples: nodejs

This is a basic usage example of the flywheeljs library: order your Flywheel cabs from the command line.

## Get ready

Run `npm install` from the `examples/nodejs` folder.

## Common params

All commands share the following params:

- `-u <username>` (or `--username`) - the email used to register on Flywheel
- `-p <password>` (or `--password`) - the Flywheel password

## Commands

The app expect to be passed a command: `account`, `status`, `request` or `cancel`.

### Account

Prints the Flywheel account information.

Example: `node index.js -u <username> -p <password> account`

### Status

Prints a specific Flywheel ride status information.

Example: `node index.js -u <username> -p <password> -r <rideId> status`

Params:

- `-r <rideId>` (or `--rideId`) - the ride id

### Cancel

Cancel a specific Flywheel ride.

Example: `node index.js -u <username> -p <password> -r <rideId> cancel`

Params:

- `-r <rideId>` (or `--rideId`) - the ride id

### Request

Request a new ride at a specific location.

Example: `node index.js -u <username> -p <password> -l <latitude> -L <longitude> request`

Params:

- `-l <latitude>` (or `--latitude`) - the latitude, in degrees
- `-L <longitude>` (or `--longitude`) - the longitude, in degrees

