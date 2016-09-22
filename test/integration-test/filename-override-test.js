// Load in our dependencies
var assert = require('assert');

// Start our tests
describe('A karma configuration using a __filenameOverride file', function () {
  // DEV: Determined exepctations via `../reference`
  it('uses the __filenameOverride for its filename and dirname', function () {
    // Example: /home/todd/github/karma-electron/test/integration-test/test-files/filename-override-context.html
    assert(/test[\/\\]integration-test[\/\\]test-files[\/\\]filename-override-context\.html$/.test(__filename),
      'Expected "' + __filename + '" to end with "test/integration-test/test-files/filename-override-context.html"');
    // Example: /home/todd/github/karma-electron/test/integration-test/test-files
    assert(/test[\/\\]integration-test[\/\\]test-files$/.test(__dirname),
      'Expected "' + __dirname + '" to end with "test/integration-test/test-files"');
    // Example: /home/todd/github/karma-electron/test/integration-test/test-files/filename-override-context.html
    assert(/test[\/\\]integration-test[\/\\]test-files[\/\\]filename-override-context\.html$/.test(module.filename),
      'Expected "' + module.filename + '" to end with ' +
      '"test/integration-test/test-files/filename-override-context.html"');
    assert.strictEqual(module.id, '.');
  });
});
