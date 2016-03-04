// Load in our dependencies
var assert = require('assert');
var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;
var program = require('commander');

// Set up our CLI parser
program.name = 'electron-launcher';
program.option('--app-data-dir', 'Directory to store application data');
program.option('--show', 'Boolean to make the window visible');
program.option('--url', 'URL to load page at');

// Parse and assert our arguments
program.parse(process.argv);
assert(program.appDataDir, 'Expected `--app-data-dir` to be provided but it was not.');
assert(program.url, 'Expected `--url` to be provided but it was not.');

// When all windows are closed, exit out
app.on('window-all-closed', function handleWindowsClosed () {
  app.quit();
});

// When Electron is done loading, launch our applicaiton
app.on('ready', function handleReady () {
  // Update our application directory
  // DEV: This prevents cookies/localStorage from contaminating across apps
  app.setPath('appData', program.appDataDir);

  // Create our browser window
  var browserWindow = new BrowserWindow({
    show: !!program.show
  });
  browserWindow.loadURL(program.url, {
    // Set a custom User-Agent for better logging
    // https://github.com/atom/electron/blob/v0.36.9/docs/api/browser-window.md#winloadurlurl-options
    // https://github.com/atom/electron/blob/v0.36.9/docs/api/web-contents.md#webcontentsloadurlurl-options
    // DEV: Default would be "Chrome 47.0.2526 (Linux 0.0.0)"
    //   https://github.com/karma-runner/karma/blob/v0.13.21/lib/browser.js#L25
    //   https://github.com/karma-runner/karma/blob/v0.13.21/lib/helper.js#L7-L11
    // Example: Electron 0.36.9 (Node.js 5.1.1)
    userAgent: 'Electron ' + process.versions.electron + ' (Node ' + process.versions.node + ')'
  });
});
