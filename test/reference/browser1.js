// Log information about our module
console.log('browser1: module.filename', module.filename);
console.log('browser1: module.exports', module.exports);
console.log('browser1: module.id', module.id);
console.log('browser1: module.loaded', module.loaded);
console.log('browser1: module.parent', module.parent);

// Load another script
void require('./browser2.js');
