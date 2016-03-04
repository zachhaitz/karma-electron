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
  var userDataDir = args.chromeDataDir || this._tempDir;

  // Set up our options to use a custom user data directory to prevent crossover in tests
  // TODO: Test that user dir is isolated
  this._getOptions = function (url) {
    return [
      '--user-data-dir=' + userDataDir
    ].concat(flags, [url]);
  };
}
ElectronBrowser.prototype = {
  name: 'Electron',
  DEFAULT_CMD: {
    linux: electronPrebuilt,
    darwin: electronPrebuilt,
    // TODO: Verify that `electronPrebuilt` will work as expected
    win32: electronPrebuilt
  },
  ENV_CMD: 'ELECTRON_BIN'
};
ElectronBrowser.$inject = ['baseBrowserDecorator', 'args'];

module.exports = {
  'launcher:Electron': ['type', ElectronBrowser]
};
