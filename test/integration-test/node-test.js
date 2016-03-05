// Load in our dependencies
var assert = require('assert');
// TODO: Fix support for loading `./submodule`
var submodule = require('/home/todd/github/karma-electron-launcher2/test/integration-test/submodule');

// Start our tests
describe('All node integrations', function () {
  it('exist as expected', function () {
    assert(require);
    assert(module);
    // Example: /home/todd/github/karma-electron-launcher/test/integration-test/node-test.js
    assert(/test\/integration-test\/node-test\.js$/.test(__filename),
      'Expected "' + __filename + '" to end with "test/integration-test/node-test.js"');
    assert.strictEqual(/^\/base\//.test(__filename), false,
      'Expected "' + __filename + '" to not start with "base"');
    // Example: /home/todd/github/karma-electron-launcher/test/integration-test
    assert(/test\/integration-test$/.test(__dirname),
      'Expected "' + __dirname + '" to end with "test/integration-test"');
    assert.strictEqual(/^\/base\//.test(__dirname), false,
      'Expected "' + __dirname + '" to not start with "base"');
    assert(process);
    assert(setImmediate);
    assert(clearImmediate);
    assert.strictEqual(global, window);
  });
});

describe('module', function () {
  describe('in the top level', function () {
    // DEV: Determined exepctations via https://gist.github.com/twolfson/c6213aa59f7c3f6477a7
    it('identify as the page itself', function () {
      // browser1: module.filename /home/todd/github/gist-electron-node-integration-explore/index.html
      // browser1.js:3 browser1: module.exports Object
      // browser1.js:4 browser1: module.id .
      // browser1.js:5 browser1: module.loaded true
      // browser1.js:6 browser1: module.parent null
      assert.strictEqual(module.parent, null);
    });
  });

  describe('in a child module', function () {
    // DEV: Determined exepctations via https://gist.github.com/twolfson/c6213aa59f7c3f6477a7
    it('identify as a standalone module', function () {
      // browser2: module.filename /home/todd/github/gist-electron-node-integration-explore/browser2.js
      // /home/todd/github/gist-electron-node-integration-explore/browser2.js:3 browser2: module.exports Object
      // /home/todd/github/gist-electron-node-integration-explore/browser2.js:4 browser2: module.id /home/todd/github/gist-electron-node-integration-explore/browser2.js
      // /home/todd/github/gist-electron-node-integration-explore/browser2.js:5 browser2: module.loaded false
      // /home/todd/github/gist-electron-node-integration-explore/browser2.js:6 browser2: module.parent Module
      assert.strictEqual(submodule.parent, module);
    });
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
    var setImmediateId = setImmediate(function handleSetImmediate () {
      setImmediateRan = true;
    });

    // Set up a setTimeout to assert and callback
    setTimeout(function handleSetTimeout () {
      assert.strictEqual(setImmediateRan, false);
      done();
    }, 100);

    // Clear our setImmediate
    clearImmediate(setImmediateId);
  });
});
