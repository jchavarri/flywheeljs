var mochaGlobals = require('./.globals.json').globals;
var fixture = require('./.fixture.json').fixture;

window.mocha.setup('bdd');
window.onload = function() {
  window.fixture = fixture;
  window.mocha.checkLeaks();
  window.mocha.globals(Object.keys(mochaGlobals));
  window.mocha.run();
  require('./setup')(window);
};
