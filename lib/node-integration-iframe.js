// Based off of https://github.com/atom/electron/blob/v0.36.9/atom/renderer/lib/init.js#L79-L117
// Bind parent window's node integration to this window
if (window.parent) {
  // Handle `if` additions
  // DEV: We skip error handlers so Karma can catch them
  window.require = window.parent.require;
  window.module = window.parent.module;
  // TODO: We need to unfuck this...
  var ErrorStackParser = require('/home/todd/github/karma-electron-launcher/node_modules/error-stack-parser');
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
      console.log(window.__karma__.config);

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
