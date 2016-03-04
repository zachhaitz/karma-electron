// DEV: This is a trimmed down version of https://github.com/karma-runner/karma-chrome-launcher/blob/v0.2.2/index.js
//   which is MIT licensed https://github.com/karma-runner/karma-chrome-launcher/blob/v0.2.2/LICENSE
var ChromeBrowser = function (baseBrowserDecorator, args) {
  baseBrowserDecorator(this);

  var flags = args.flags || [];
  var userDataDir = args.chromeDataDir || this._tempDir;

  this._getOptions = function (url) {
    return [
      '--user-data-dir=' + userDataDir
    ].concat(flags, [url]);
  };
};
ChromeBrowser.prototype = {
  name: 'Chrome',
  DEFAULT_CMD: {
    linux: '/usr/bin/google-chrome',
    darwin: null,
    win32: null
  },
  ENV_CMD: 'CHROME_BIN'
};
ChromeBrowser.$inject = ['baseBrowserDecorator', 'args'];

module.exports = {
  'launcher:Chrome': ['type', ChromeBrowser]
};
