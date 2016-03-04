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
  it('runs before `setTimeout`', function (done) {
    // Set up a setImmediate
    var setImmediateRan = false;
    setImmediate(function handleSetImmediate () {
      setImmediateRan = true;
    });

    // Set up a setTimeout to assert and callback
    setTimeout(function handleSetTimeout () {
      assert.strictEqual(setImmediateRan, true);
      done();
    }, 100);
  });
});

describe('clearImmediate', function () {
  it('clears an existing `setImmediate`', function (done) {
    // Set up a setImmediate
    var setImmediateRan = false;
    var setImmediateTimer = setImmediate(function handleSetImmediate () {
      setImmediateRan = true;
    });

    // Set up a setTimeout to assert and callback
    setTimeout(function handleSetTimeout () {
      assert.strictEqual(setImmediateRan, false);
      done();
    }, 100);

    // Clear our setImmediate
    clearImmediate(setImmediateTimer);
  });
});
