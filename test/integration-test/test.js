// Load in our dependencies
var assert = require('assert');

// Start our tests
describe('A basic operation', function () {
  it('asserts without errors', function () {
    assert.strictEqual(1 + 1, 2);
  });
});

describe('All node integrations', function () {
  it('exist as expected', function () {
    assert(require);
    assert(module);
    assert(__filename);
    assert(__dirname);
    assert(process);
    assert(setImmediate);
    assert(clearImmediate);
    assert.strictEqual(global, window);
  });
});

describe('setImmediate', function () {
  it('runs before `setTimeout`', function () {
    // TODO: Complete me
  });
});

describe('clearImmediate', function () {
  it('clears an existing `setImmediate`', function () {
    // TODO: Complete me
  });
});
