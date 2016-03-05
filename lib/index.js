// Load in our dependencies
var xtend = require('xtend');

// Return our merged exports
module.exports = xtend({},
  require('./karma-electron-framework'),
  require('./karma-electron-launcher'));
