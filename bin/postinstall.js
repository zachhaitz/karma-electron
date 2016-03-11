#!/usr/bin/env node
// Load in our dependencies
// TODO: Remove this file once Karma has patched `postMessage`` support
//   https://github.com/karma-runner/karma/pull/1984
var path = require('path');
var shelljs = require('shelljs');

// Delete the existing `karma` install
shelljs.rm('-r', path.join('node_modules', 'karma'));

// Clone the karma repo
shelljs.cd('node_modules');
shelljs.exec('git clone https://github.com/twolfson/karma');
shelljs.cd('karma');

// Checkout our custom version
shelljs.exec('git checkout 03273f2');

// Install our dependencies and run the build
shelljs.exec('npm install');
shelljs.exec('npm run build');
