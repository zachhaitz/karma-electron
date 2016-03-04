// Based off of https://github.com/atom/electron/blob/v0.36.9/atom/renderer/lib/init.js#L79-L117
// Bind parent window's node integration to this window
if (window.parent) {
  // Handle `if` additions
  // DEV: We skip error handlers so Karma can catch them
  window.require = window.parent.require;
  window.module = window.parent.module;
  var ErrorStackParser = require('error-stack-parser');
  Object.defineProperty(window, '__filename', {
    configurable: false,
    enumerable: false,
    get: function () {
      console.log('wat', new Error('boom'));
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
