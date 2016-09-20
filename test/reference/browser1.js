// Log information about our module
console.log('browser1: module.filename', module.filename); // /home/todd/github/karma-electron/test/reference/index.html
console.log('browser1: module.exports', module.exports); // {}
console.log('browser1: module.id', module.id); // .
console.log('browser1: module.loaded', module.loaded); // true
console.log('browser1: module.parent', module.parent); // null

// Load another script
void require('./browser2.js');
