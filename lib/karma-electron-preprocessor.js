// Load our dependencies
var fs = require('fs');
var path = require('path');
var convertSourceMap = require('convert-source-map');
var SourceMapConsumer = require('source-map').SourceMapConsumer;
var SourceMapGenerator = require('source-map').SourceMapGenerator;
var minstache = require('minstache');
var jsStringEscape = require('js-string-escape');

// Load our template
// DEV: We minify to remove impact of line numbers
//   To reproduce this, make a test fail and remove minification
//   Notice how the error line goes from 10 to 30 =(
// DEV: We should be using a minifier but the mustache template prevents this
var templateStr = fs.readFileSync(__dirname + '/node-integration-iframe.mustache.js', 'utf8');
var minifiedTemplateStr = templateStr.replace(/\/\/[^\n]+/g, '\n').replace(/\n/g, '');
// DEV: We inject a newline after content to prevent `//` comments from breaking our closure
minifiedTemplateStr = minifiedTemplateStr.replace(/(content}})/, '$1\n');
var template = minstache.compile(minifiedTemplateStr);

// Define our framework to inject our `node-integration`
var $inject = ['config.basePath'];
function createElectronPreprocessor(karmaBasePath) {
  // Generate our preprocessor function
  function electronPreprocessor(content, file, done) {
    // Render our content without a source map
    var inlineSourceMap = convertSourceMap.fromSource(content);
    var output = template({
      content: convertSourceMap.removeComments(content),
      dirname: jsStringEscape(path.dirname(file.originalPath)),
      filename: jsStringEscape(file.originalPath),
      karmaBasePath: jsStringEscape(karmaBasePath),
      sep: jsStringEscape(path.sep)
    });

    // Create a default source map for our content
    // TODO: Add file path for content
    var sourceMapGenerator = new SourceMapGenerator();
    // console.log(file);

    // If there was an inline source map, then consume the original content
    if (inlineSourceMap) {
      var sourceMapConsumer = new SourceMapConsumer(inlineSourceMap.toObject());
    }

    // Callback with our content
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
