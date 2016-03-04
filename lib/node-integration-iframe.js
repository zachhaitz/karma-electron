(function () {
// Based off of https://github.com/atom/electron/blob/v0.36.9/atom/renderer/lib/init.js#L79-L117
// Bind parent window's node integration to this window
// DEV: Due to using an `iframe`, we lose the node integration inheritance =/
if (window.parent.require && !window.require) {
  // Handle require/module bindings
  // DEV: We skip error handlers so Karma can catch them
  window.require = window.parent.require;
  window.module = window.parent.module;

  // Load internal dependencies
  var assert = require('assert');
  var Module = require('module');
  var querystring = require('querystring');
  var url = require('url');

  // Resolve secret Karma config info
  // 'http://localhost:9877/?id=2996591&karmaBasePath=%2Fhome%2Ftodd%2Fgithub%2Fkarma-electron-launcher%2Ftest%2Fintegration-test&karmaUrlRoot=%2F'
  //    -> {hostname, port, query: {karmaBasePath, karmaUrlRoot}}
  var href = window.parent.location.href;
  var urlInfo = url.parse(href, true);
  var karmaBasePath = urlInfo.query.karmaBasePath;
  var karmaUrlRoot = urlInfo.query.karmaUrlRoot;
  assert(karmaBasePath, 'Expected "karmaBasePath" to be defined in "' + href + '" but it was not.');
  assert(karmaUrlRoot, 'Expected "karmaUrlRoot" to be defined in "' + href + '" but it was not.');

  // Add our base directory as the path to find node modules from
  module.paths = module.paths.concat(Module._nodeModulePaths(karmaBasePath));

  // Load external dependencies
  var ErrorStackParser = require('error-stack-parser');

  // Define a `__filename`/`__dirname` that will be appropriate for the script being invoked
  Object.defineProperty(window, '__filename', {
    configurable: false,
    enumerable: false,
    get: function () {
      // Look back 2 frames
      // i.e. `defineProperty` -> caller
      var frames = ErrorStackParser.parse(new Error('boom'));
      var callerFrame = frames[1];

      // Extract the fileName and parse it against `karma`
      // https://github.com/karma-runner/karma/blob/v0.13.21/lib/middleware/source_files.js#L16-L22
      // 'http://localhost:9877/base/node-test.js?d811f7d9578a7c393ca4042973f8e8713ff7022f'
      //    -> `/base/node-test.js` -> `/home/todd/github/.../node-test.js`
      var filename = querystring.unescape(callerFrame.fileName)
        .replace(karmaUrlRoot, '/')
        .replace(/\?.*$/, '')
        .replace(/^\/absolute/, '')
        .replace(/^\/base/, karmaBasePath);
      console.log('waaaat', filename);

      console.log('wat');
      return 'hi';
    }
  });
  window.__dirname = window.parent.__dirname;

  // Handle `else` additions
  window.process = window.parent.process;
  window.setImmediate = window.parent.setImmediate;
  window.clearImmediate = window.parent.clearImmediate;
  window.global = window;
}
}());
