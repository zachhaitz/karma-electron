(function () {
  // Set up local requires
  console.log('wtf', global);
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
    require = function (filepath) {
      return __require(__requireFilepath(filepath));
    };
    require.resolve = function (filepath) {
      return __requireResolve(__requireFilepath(filepath));
    };
  }

  // Inject our content
  // jshint ignore:start
  {{!content}}
  // jshint ignore:end
  // jscs:enable
}());
