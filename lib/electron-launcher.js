// Load in our dependencies
var assert = require('assert');
var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;

// Find the argv matching our URL pattern
// DEV: If this becomes complex, use `commander` with `allowUnknownOption`
var urlArgs = process.argv.filter(function matchUrlPattern (arg) {
  return /^--url=/.test(arg);
});
assert.strictEqual(urlArgs.length, 1, 'Expected only 1 `--url=` parameter but received ' + urlArgs.length);
var url = urlArgs[0].replace('--url=', '');

// When all windows are closed, exit out
app.on('window-all-closed', function handleWindowsClosed () {
  app.quit();
});

// When Electron is done loading, launch our applicaiton
app.on('ready', function handleReady () {
  // Create our browser window
  // TODO: Allow user to customize show via CLI flag
  var browserWindow = new BrowserWindow({show: false});
  browserWindow.loadURL(url, {
    // Set a custom User-Agent for better logging
    // DEV: Default would be "Chrome 47.0.2526 (Linux 0.0.0)"
    //   https://github.com/karma-runner/karma/blob/v0.13.21/lib/browser.js#L25
    //   https://github.com/karma-runner/karma/blob/v0.13.21/lib/helper.js#L7-L11
    // Example: Electron 0.36.9 (Node.js 5.1.1)
    userAgent: 'Electron ' + process.versions.electron + ' (Node ' + process.versions.node + ')'
  });
});
