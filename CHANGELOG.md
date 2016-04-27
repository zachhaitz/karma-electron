# karma-electron changelog
3.1.0 - Added support for source maps via @otbe in #4

3.0.5 - Upgraded to Electron@0.37.4 in development via @ppitonak in #1

3.0.4 - Added tests for Node.js@5 in Travis CI via @ppitonak in #1

3.0.3 - Added missing `test-karma-phantomjs` to `test-karma-all`

3.0.2 - Added tests to verify we don't pollute non-Node environments

3.0.1 - Fixed `xtend` dependency

3.0.0 - Moved from `framework` to `preprocessor` for better file-specific variable support (e.g. `__filename`, `__dirname`, `require`)

2.0.2 - Renamed package to `karma-electron`

2.0.1 - Repaired Appveyor failures

2.0.0 - Moved `files` hack to a framework implementation

1.1.0 - Added support for relative `require` and verified support for `module` properties

1.0.0 - Initial release
