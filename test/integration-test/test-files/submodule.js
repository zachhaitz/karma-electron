// Export our module as our export
module.exports = module;

// Export other magic globals
module.exports.filename = __filename;
module.exports.dirname = __dirname;

// Add a special identifier for `module.exports` assertions
module.exports.hello = 'world';

// Add property with proper window context
console.log('hi', window.before, console.log);
module.exports.before = window.before;
