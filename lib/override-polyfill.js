// Load in our dependencies
var ipcRenderer = require('electron').ipcRenderer;
var _open = window.open;

// Override already overridden `window.open` to polyfill setting `window.location`
// https://github.com/atom/electron/blob/v0.37.2/lib/renderer/override.js#L93-L148
// https://github.com/atom/electron/blob/v0.37.2/lib/renderer/override.js#L60-L67
window.open = function () {
  // Create our window
  var childWindow = _open.apply(this, arguments);

  // If a window was created and there's no location property, then polyfill it
  if (childWindow && !childWindow.hasOwnProperty('location')) {
    Object.defineProperty(childWindow, 'location', {
      set: function (url) {
        return ipcRenderer.send('ATOM_SHELL_GUEST_WINDOW_MANAGER_WINDOW_METHOD', this.guestId, 'loadURL', url);
      }
    });
  }

  // Return our child window
  return childWindow;
};
