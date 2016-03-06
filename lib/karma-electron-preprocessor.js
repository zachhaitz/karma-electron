// Load our dependencies
var fs = require('fs');

// Load our template
var template = fs.readFileSync(__dirname + '/node-integration-iframe.js');

// Define our framework to inject our `node-integration`
var $inject = [];
function createElectronPreprocessor() {
  // Generate our preprocessor function
  function electronPreprocessor(content, file, done) {
    // Prepend our `node-integration-iframe` to all content
    // TODO: Make it a wrapper instead
    done(null, template + '\n' + content);
  }

  // Return our preprocessor
  return electronPreprocessor;
}

// Define depenencies so our function can receive them
createElectronPreprocessor.$inject = $inject;

// Export our launcher
module.exports = {
  'preprocessor:electron': ['factory', createElectronPreprocessor]
};
