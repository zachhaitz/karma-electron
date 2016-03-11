(function () {
  // Set up local filename and dirname
  // DEV: `__filename` would be a path to Atom since we are loading an HTTP URL
  //   Once we perform a `require`, it will be using our `require's` context :+1:
  var __filename = '{{!filename}}';
  var __dirname = '{{!dirname}}';

  if (__filename) {
    // Save original require/require.resolve
    var __require = global.require;
    var __requireResolve = __require.resolve;

    // Add our base directory as the path to find node modules from
    if (!window.__karmaBasePathAddedToModule) {
      module.paths = module.paths.concat(__require('module')._nodeModulePaths('{{!karmaBasePath}}'));
      window.__karmaBasePathAddedToModule = true;
    }

    // Define our patched require/require.resolve
    var __requireFilepath = function (filepath) {
      // If the filepath is relative, prepend the filename
      // e.g. `./submodule` -> `/home/todd/.../integration-test/./submodule`
      if (filepath && filepath[0] === '.') {
        filepath = __dirname + '{{!sep}}' + filepath;
      }

      // Return our filepath
      return filepath;
    };
    // Define our require/resolve.resolve
    global.require = function (filepath) {
      return __require(__requireFilepath(filepath));
    };
    global.require.resolve = function (filepath) {
      return __requireResolve(__requireFilepath(filepath));
    };
  // jscs:disable
  }

  // Inject our content
  // jshint ignore:start
  {{!content}}
  // jshint ignore:end
  // jscs:enable
}());
