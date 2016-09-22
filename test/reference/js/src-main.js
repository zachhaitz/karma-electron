// Log information about our module
console.log('src-main: module.filename', module.filename);
  // /home/todd/github/karma-electron/test/reference/index.html
console.log('src-main: module.exports', module.exports); // {}
console.log('src-main: module.id', module.id); // .
console.log('src-main: module.loaded', module.loaded); // true
console.log('src-main: module.parent', module.parent); // null

// Load another script via `require`
// DEV: Our path begins from perspective of `index.html` due to using `<script src=`
//   https://github.com/twolfson/karma-electron/issues/11
void require('./js/src-submodule.js');
