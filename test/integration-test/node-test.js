// Load in our dependencies
var assert = require('assert');

// Start our tests
describe('All node integrations', function () {
  it('exist as expected', function () {
    assert(require);
    assert(module);
    // TODO: `__filename` not working isn't so great...
    //   We should revisit this...
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
