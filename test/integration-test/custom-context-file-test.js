// Load in our dependencies
var assert = require('assert');

// Start our tests
describe('A karma configuration using a custom context file', function () {
  // DEV: Determined exepctations via `../reference`
  it('has the custom context file as its filename and dirname', function () {
    // Example: /home/todd/github/karma-electron/test/integration-test/test-files/custom-context.html
    assert(/test[\/\\]integration-test[\/\\]test-files[\/\\]custom-context\.html$/.test(__filename),
      'Expected "' + __filename + '" to end with "test/integration-test/test-files/custom-context.html"');
    // Example: /home/todd/github/karma-electron/test/integration-test/test-files
    assert(/test[\/\\]integration-test[\/\\]test-files$/.test(__dirname),
      'Expected "' + __dirname + '" to end with "test/integration-test/test-files/custom-context.html"');
    // Example: /home/todd/github/karma-electron/test/integration-test/test-files/custom-context.html
    assert(/test[\/\\]integration-test[\/\\]test-files$/.test(module.filename),
      'Expected "' + module.filename + '" to end with "test/integration-test/test-files/custom-context.html"');
    assert.strictEqual(module.id, '.');
  });
});
