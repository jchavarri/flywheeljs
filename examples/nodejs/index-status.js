const flywheel = require('flywheeljs');
const generateRideFunction = require('./generate-ride-function.js').generateRideFunction;

generateRideFunction('status', 'get information about a Flywheel ride', flywheel.getRideStatus);
