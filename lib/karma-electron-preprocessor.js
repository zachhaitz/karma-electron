// Load our dependencies
var fs = require('fs');
var path = require('path');
var minstache = require('minstache');
var jsStringEscape = require('js-string-escape');

// Load our template
var templateStr = fs.readFileSync(__dirname + '/node-integration-iframe.mustache.js', 'utf8');
var template = minstache.compile(templateStr);

// Define our framework to inject our `node-integration`
var $inject = [];
function createElectronPreprocessor() {
  // Generate our preprocessor function
  function electronPreprocessor(content, file, done) {
    // Render and callback with our content
    var output = template({
      content: content,
      dirname: jsStringEscape(path.dirname(file.originalPath)),
      filename: jsStringEscape(file.originalPath),
      sep: jsStringEscape(path.sep)
    });
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
