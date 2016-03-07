// Load our dependencies
var fs = require('fs');
var minstache = require('minstache');

// Load our template
var templateStr = fs.readFileSync(__dirname + '/node-integration-iframe.mustache.js', 'utf8');
var template = minstache.compile(templateStr);

// Define our framework to inject our `node-integration`
var $inject = [];
function createElectronPreprocessor() {
  // Generate our preprocessor function
  function electronPreprocessor(content, file, done) {
    // Render and callback with our content
    var output = template({content: content});
    console.log('--------------\n' + output + '\n-------------\n');
    done(null, output);
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
