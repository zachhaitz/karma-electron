// Load in our dependencies
var assert = require('assert');

// Start our tests
// TODO: Add a test that fails (we can make it run based on environment variable in `karma.conf.js`)
describe('A basic operation', function () {
  it('asserts without errors', function () {
    assert.strictEqual(1 + 1, 2);
  });
});
