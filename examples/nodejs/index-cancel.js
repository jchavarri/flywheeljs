const flywheel = require('flywheeljs');
const generateRideFunction = require('./generate-ride-function.js').generateRideFunction;

generateRideFunction('cancel', 'cancel a Flywheel ride', flywheel.cancelRide);
