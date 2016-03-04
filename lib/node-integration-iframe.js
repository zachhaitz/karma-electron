// Based off of https://github.com/atom/electron/blob/v0.36.9/atom/renderer/lib/init.js#L79-L117
// Bind parent window's node integration to this window
if (window.parent) {
  // Handle `if` additions
  // DEV: We skip error handlers so Karma can catch them
  // TODO: Test all of these including `onerror` handlers
  window.require = window.parent.require;
  window.module = window.parent.module;
  window.__filename = window.parent.__filename;
  window.__dirname = window.parent.__dirname;

  // Handle `else` additions
  window.process = window.parent.process;
  window.setImmediate = window.parent.setImmediate;
  window.clearImmediate = window.parent.clearImmediate;
  window.global = window;
}
