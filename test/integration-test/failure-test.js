// Load in our dependencies
var assert = require('assert');

// Start our tests
describe('An invalid assertion', function () {
  it('raises an error', function () {
    assert.strictEqual(1, 2);
  });
});
