// Log information about our module
console.log('script-src: module.filename', module.filename);
  // /home/todd/github/karma-electron/test/reference/index.html
console.log('script-src: module.exports', module.exports); // {}
console.log('script-src: module.id', module.id); // .
console.log('script-src: module.loaded', module.loaded); // true
console.log('script-src: module.parent', module.parent); // null

// Load another script via `require`
// DEV: Our path begins from perspective of `index.html` due to using `<script src=`
//   https://github.com/twolfson/karma-electron/issues/11
void require('./js/src-submodule.js');
