// Load in our dependencies
// DEV: Using patterns from https://github.com/karma-runner/karma-mocha/blob/v0.2.2/lib/index.js
var path = require('path');

// Define a helper to create unwatched file patterns
function createPattern(path) {
  return {pattern: path, included: true, served: true, watched: false};
}

// Define our framework to inject our `node-integration`
var $inject = ['config.files'];
function ElectronFramework(files) {
  // Add our file to the start of the files
  files.unshift(createPattern(path.join(__dirname, 'node-integration-iframe.js')));
}

// Define depenencies so our function can receive them
ElectronFramework.$inject = $inject;

// Export our launcher
module.exports = {
  'framework:electron': ['factory', ElectronFramework]
};
