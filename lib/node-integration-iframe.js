(function () {
  // Based off of https://github.com/atom/electron/blob/v0.36.9/atom/common/lib/init.js#L34-L47
  // Bind parent window's node integration to this window
  // DEV: Due to using an `iframe`, we lose the node integration inheritance =/
  if (window.parent.require && !window.require) {
    // Handle module, and other easy top-level bindings
    // DEV: We skip error handlers so Karma can catch them
    // DEV: We need to know `__filename` for relative `require` so see below
    var _require = window.parent.require;
    window.module = window.parent.module;
    window.process = window.parent.process;
    window.setImmediate = window.parent.setImmediate;
    window.clearImmediate = window.parent.clearImmediate;
    window.global = window;

    // Load internal dependencies
    var assert = _require('assert');
    var Module = _require('module');
    var path = _require('path');
    var querystring = _require('querystring');
    var url = _require('url');

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
    var ErrorStackParser = _require('error-stack-parser');

    // Define a `__filename`/`__dirname` that will be appropriate for the script being invoked
    // DEV: We use `var =` syntax to silence JSHint errors
    var getFilename = function (framesBack) {
      // Look back `n` frames
      // e.g. `getFilename` -> `defineProperty` -> caller
      var frames = ErrorStackParser.parse(new Error('boom'));
      var callerFrame = frames[framesBack];

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
        return getFilename(2);
      }
    });
    Object.defineProperty(window, '__dirname', {
      configurable: false,
      enumerable: false,
      get: function () {
        // Get our filename, remove the filename, and return the dirname
        var filename = getFilename(2);
        return path.dirname(filename);
      }
    });

    // Define our patched require/require.resolve
    var requireFilepath = function (filepath) {
      // If the filepath is relative, prepend the filename
      // e.g. `./submodule` -> `/home/todd/.../integration-test/./submodule`
      if (filepath && filepath[0] === '.') {
        var baseDirpath = path.dirname(getFilename(3));
        filepath = baseDirpath + path.sep + filepath;
      }

      // Return our filepath
      return filepath;
    };
    window.require = function (filepath) {
      return _require(requireFilepath(filepath));
    };
    var _requireResolve = _require.resolve;
    window.require.resolve = function (filepath) {
      return _requireResolve(requireFilepath(filepath));
    };
  }
}());
