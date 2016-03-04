// Load in dependencies
var assert = require('assert');
var karmaElectronLauncher = require('../');

// Start our tests
describe('karma-electron-launcher', function () {
  it('returns awesome', function () {
    assert.strictEqual(karmaElectronLauncher(), 'awesome');
  });
});
