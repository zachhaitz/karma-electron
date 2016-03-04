// Load in our dependencies
var assert = require('assert');
var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;

// Find the argv matching our URL pattern
// DEV: If this becomes complex, use `commander` with `allowUnknownOption`
var urlArgs = process.argv.filter(function matchUrlPattern (arg) {
  return /^--url=/.test(arg);
});
assert(urlArgs.length, 1, 'Expected only 1 `--url=` parameter but received ' + urlArgs.length);
var url = urlArgs[0].replace('--url=', '');

// When all windows are closed, exit out
app.on('window-all-closed', function handleWindowsClosed () {
  app.quit();
});

// When Electron is done loading, launch our applicaiton
app.on('ready', function handleReady () {
  // Create our browser window
  var browserWindow = new BrowserWindow({
    nodeIntegration: true
  });
  browserWindow.loadURL(url);
});
