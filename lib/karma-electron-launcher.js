// Load in our dependencies
// DEV: We use `require`/`assert` instead of `peerDependencies` to make floating dependencies easier
var electronPrebuilt;
try {
  electronPrebuilt = require('electron-prebuilt');
} catch (err) {
  console.error('Expected `electron-prebuilt` to be installed but it was not. Please install it.');
  throw err;
}

// DEV: This is a trimmed down version of https://github.com/karma-runner/karma-chrome-launcher/blob/v0.2.2/index.js
//   which is MIT licensed https://github.com/karma-runner/karma-chrome-launcher/blob/v0.2.2/LICENSE
function ElectronBrowser(baseBrowserDecorator, args) {
  // Apply browser decorations to ourself
  baseBrowserDecorator(this);

  // Extract arguments
  var flags = args.flags || [];
  var appDataDir = args.appDataDir || this._tempDir;

  // Set up our options to use a custom app data directory to prevent crossover in tests
  this._getOptions = function (url) {
    return [
      '--app-data-dir=' + appDataDir,
      '--url=' + url
    ].concat(flags, __dirname + '/electron-launcher.js');
  };
}
ElectronBrowser.prototype = {
  name: 'Electron',
  DEFAULT_CMD: {
    linux: electronPrebuilt,
    darwin: electronPrebuilt,
    win32: electronPrebuilt
  },
  ENV_CMD: 'ELECTRON_BIN'
};
ElectronBrowser.$inject = ['baseBrowserDecorator', 'args'];

module.exports = {
  'launcher:Electron': ['type', ElectronBrowser]
};
