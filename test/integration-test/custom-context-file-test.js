// Load in our dependencies
var assert = require('assert');

// Start our tests
// DEV: To test custom debug file, append the following config and add an error in test
//   (e.g. `throw new Error('Debug test');`)
//   Then, run our standalone script: `npm run test-karma-custom-context-file`
/*
config.set({
  browserNoActivityTimeout: 60 * 60 * 1000, // 1 hour
  browsers: ['CustomElectron'],
  customLaunchers: {
    CustomElectron: {
      base: 'Electron',
      flags: ['--show']
    }
  }
});
*/
describe('A karma configuration using a custom context file', function () {
  // DEV: Determined exepctations via `../reference`
  it('has the custom context file as its filename and dirname', function () {
    // Example: /home/todd/github/karma-electron/test/integration-test/test-files/custom-context.html
    assert(/test[\/\\]integration-test[\/\\]test-files[\/\\]custom-context\.html$/.test(__filename),
      'Expected "' + __filename + '" to end with "test/integration-test/test-files/custom-context.html"');
    // Example: /home/todd/github/karma-electron/test/integration-test/test-files
    assert(/test[\/\\]integration-test[\/\\]test-files$/.test(__dirname),
      'Expected "' + __dirname + '" to end with "test/integration-test/test-files"');
    // Example: /home/todd/github/karma-electron/test/integration-test/test-files/custom-context.html
    assert(/test[\/\\]integration-test[\/\\]test-files[\/\\]custom-context\.html$/.test(module.filename),
      'Expected "' + module.filename + '" to end with "test/integration-test/test-files/custom-context.html"');
    assert.strictEqual(module.id, '.');
  });
});
