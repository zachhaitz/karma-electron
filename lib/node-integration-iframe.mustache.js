(function () {
  // Based off of https://github.com/atom/electron/blob/v0.36.9/atom/common/lib/init.js#L34-L47
  // Bind parent window's node integration to this closure
  // DEV: Due to using an `iframe`, we lose the node integration inheritance =/
  // DEV: We use a closure since `__filename`/`__dirname` and relative requires change based on file
  // DEV: We skip error handlers so Karma can catch them
  var parentWindow = window.parent || {};
  var module = parentWindow.module ? module : undefined;
  var process = parentWindow.process ? parentWindow.process : undefined;
  var setImmediate = parentWindow.setImmediate ? parentWindow.setImmediate : undefined;
  var clearImmediate = parentWindow.clearImmediate ? parentWindow.clearImmediate : undefined;
  var global = parentWindow.module ? window : undefined;
  var __filename = parentWindow.module ? '{{!filename}}' : undefined;
  var __dirname = parentWindow.module ? '{{!dirname}}' : undefined;

  // Unset our `parentWindow` to prevent leaks
  parentWindow = undefined;

  // Set up local requires
  var require;
  if (__filename) {
    // Save original require/require.resolve
    var __require = parentWindow.require;
    var __requireResolve = __require.resolve;

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
  {{!content}}
}());
