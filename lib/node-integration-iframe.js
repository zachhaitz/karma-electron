(function () {
  // Based off of https://github.com/atom/electron/blob/v0.36.9/atom/common/lib/init.js#L34-L47
  // Bind parent window's node integration to this window
  // DEV: Due to using an `iframe`, we lose the node integration inheritance =/
  if (window.parent.require && !window.require) {
    // Handle require, module, and other easy top-level bindings
    // DEV: We skip error handlers so Karma can catch them
    window.require = window.parent.require;
    window.module = window.parent.module;
    window.process = window.parent.process;
    window.setImmediate = window.parent.setImmediate;
    window.clearImmediate = window.parent.clearImmediate;
    window.global = window;

    // Load internal dependencies
    var assert = require('assert');
    var Module = require('module');
    var path = require('path');
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
    // DEV: We use `var =` syntax to silence JSHint errors
    var getFilename = function () {
      // Look back 3 frames
      // i.e. `getFilename` -> `defineProperty` -> caller
      var frames = ErrorStackParser.parse(new Error('boom'));
      var callerFrame = frames[2];

      // Extract the fileName and parse it against `karma`
      // https://github.com/karma-runner/karma/blob/v0.13.21/lib/middleware/source_files.js#L16-L22
      // 'http://localhost:9877/base/node-test.js?d811f7d9578a7c393ca4042973f8e8713ff7022f'
      //    -> `/base/node-test.js` -> `/home/todd/github/.../node-test.js`
      var filename = querystring.unescape(url.parse(callerFrame.fileName).pathname)
        .replace(karmaUrlRoot, '/')
        .replace(/\?.*$/, '')
        .replace(/^\/absolute/, '')
        .replace(/^\/base/, karmaBasePath);

      // Return our parsed filename
      return filename;
    };
    Object.defineProperty(window, '__filename', {
      configurable: false,
      enumerable: false,
      get: function () {
        // Get and return our filename
        return getFilename();
      }
    });
    Object.defineProperty(window, '__dirname', {
      configurable: false,
      enumerable: false,
      get: function () {
        // Get our filename, remove the filename, and return the dirname
        var filename = getFilename();
        return path.dirname(filename);
      }
    });
  }
}());
