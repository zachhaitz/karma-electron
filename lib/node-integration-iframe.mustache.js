// TODO: Support customContextFile (should be as simple as using `config.customContextFile`)
// TODO: Test customContextFile
// TODO: Verify `module.id` etc are patched
// TODO: Support Node.js required files (should be same code but at the end using a `./require`?
// TODO: Update README with require behavior (might adjust features)

console.log(__filename);
  // /home/todd/github/karma-electron/node_modules/electron/dist/resources/electron.asar/renderer/init.js
console.log(window.location.href);
  // http://localhost:9876/context.html
  // ^ `context.html` should be our goal __filename

(function () {
  // Set up local filename and dirname
  // DEV: `__filename` would be a path to Electron since we are loading an HTTP URL
  //   /home/todd/github/karma-electron/node_modules/electron/dist/resources/electron.asar/renderer/init.js
  //   This overrides to user's expectations of Karma's `file://` filepaths
  // DEV: Ignore JSHint so we can override `__filename` in our closure
  // DEV: We use `window.require` sniffing to prevent emulating a Node.js environment in a non-Node.js one
  var __filename, __dirname;
  if (window.require) {
    __filename = window.location.path !== '/debug.html' ? '{{!karmaContextFile}}' : '{{!karmaDebugFile}}';
    __dirname = window.require('path').dirname(__filename);
    console.log(__filename, __dirname);
  }

  // Save original require/require.resolve
  if (window.require) {
    var __require = window.require;
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
    window.require = function (filepath) {
      return __require(__requireFilepath(filepath));
    };
    window.require.resolve = function (filepath) {
      return __requireResolve(__requireFilepath(filepath));
    };
  // jscs:disable
  // DEV: Due to the Mustache content, we have to add a `jscs:disable` early
  }

  // Inject our content
  // jshint ignore:start
  {{!content}}
  // jshint ignore:end
  // jscs:enable
}());
