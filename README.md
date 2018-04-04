# karma-electron [![Build status](https://travis-ci.org/twolfson/karma-electron.svg?branch=master)](https://travis-ci.org/twolfson/karma-electron) [![Build status](https://ci.appveyor.com/api/projects/status/urgpvcip7kl9q2ih/branch/master?svg=true)](https://ci.appveyor.com/project/twolfson/karma-electron-launcher/branch/master)

**Test scripts:**

```
./node_modules/.bin/browserify --debug hi.js > hi.browserify.js
./node_modules/.bin/uglifyjs --compress --source-map --output hi.min.js -- hi.browserify.js
./node_modules/.bin/browserify --debug hi.browserify.js > hi.browserify2.js

# Browserify
{"version":3,"sources":["node_modules/browserify/node_modules/browser-pack/_prelude.js","hi.js"],"names":[],"mappings":"AAAA;ACAA;AACA","file":"generated.js","sourceRoot":"","sourcesContent":["(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c=\"function\"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error(\"Cannot find module '\"+i+\"'\");throw a.code=\"MODULE_NOT_FOUND\",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u=\"function\"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()","console.log('hi');\n"]}

# UglifyJS
{"version":3,"sources":["hi.browserify.js"],"names":["r","e","n","t","o","i","f","c","require","u","a","Error","code","p","exports","call","length","1","module","console","log"],"mappings":"CAAY,SAASA,EAAEC,EAAEC,EAAEC,GAAG,SAASC,EAAEC,EAAEC,GAAG,IAAIJ,EAAEG,GAAG,CAAC,IAAIJ,EAAEI,GAAG,CAAC,IAAIE,EAAE,mBAAmBC,SAASA,QAAQ,IAAIF,GAAGC,EAAE,OAAOA,EAAEF,GAAE,GAAI,GAAGI,EAAE,OAAOA,EAAEJ,GAAE,GAAI,IAAIK,EAAE,IAAIC,MAAM,uBAAuBN,EAAE,KAAK,MAAMK,EAAEE,KAAK,mBAAmBF,EAAE,IAAIG,EAAEX,EAAEG,GAAG,CAACS,QAAQ,IAAIb,EAAEI,GAAG,GAAGU,KAAKF,EAAEC,QAAQ,SAASd,GAAoB,OAAOI,EAAlBH,EAAEI,GAAG,GAAGL,IAAeA,IAAIa,EAAEA,EAAEC,QAAQd,EAAEC,EAAEC,EAAEC,GAAG,OAAOD,EAAEG,GAAGS,QAAQ,IAAI,IAAIL,EAAE,mBAAmBD,SAASA,QAAQH,EAAE,EAAEA,EAAEF,EAAEa,OAAOX,IAAID,EAAED,EAAEE,IAAI,OAAOD,EAA7b,CAA4c,CAACa,EAAE,CAAC,SAAST,QAAQU,OAAOJ,SACxeK,QAAQC,IAAI,OAEV,KAAK,GAAG,CAAC"}
```

[Karma][] launcher and preprocessor for [Electron][]

This was written to allow for directly testing in [Electron][] where we might want `require` to work automatically

[Karma]: https://github.com/karma-runner/karma
[Electron]: https://github.com/atom/electron

**Features:**

- Tested via CI on Linux and Windows
- Support for Node.js integration in the renderer process (e.g. `node_modules`, `__filename`, relative paths for `require`)
- Support for hidden browser windows
- Support for isolated test runs to prevent cookie/localStorage pollution

**Requirements:**

- `karma>=1.1.0` to work within `electron's` security policy for shared context between parent/child windows
    - See https://github.com/karma-runner/karma/pull/1984 for more information

**Notices:**

- This plugin has been tested against `electron@0.37.4` and `electron@1.3.3` but should support the latest version
- This plugin is best suited for testing the renderer portion of an `electron` application
    - For testing a full application, see `electron's` documentation on Selenium and WebDriver
    - https://github.com/electron/electron/blob/v1.3.6/docs/tutorial/using-selenium-and-webdriver.md

## Breaking changes in 5.0.0
We have corrected inaccuracies with `file://` behavior from Electron. For example:

- `__filename` is now Karma's `context.html`
- Relative paths for `require` resolve from Karma's `context.html` directory

We have transferred support for this to the option `client.loadScriptsViaRequire` which loads scripts via `require` and has the original expected Node.js behavior

For more information, see https://github.com/twolfson/karma-electron/issues/11

## Getting Started
On a project that has been set up with `karma init` already, install the module via:

```bash
# Install our module and `electron`
npm install karma-electron electron
```

Then, configure the module:

```js
// Inside `karma.conf.js`
browsers: ['Electron']

// If you would like Node.js integration support (e.g. `require`)
//   then, you must include this in `preprocessors` and `client`
// DEV: preprocessors is for backfilling `__filename` and local `require` paths
preprocessors: {
  '**/*.js': ['electron']
},
// DEV: `useIframe: false` is for launching a new window instead of using an iframe
//   In Electron, iframes don't get `nodeIntegration` priveleges yet windows do
client: {
  useIframe: false
}
```

Then, we can run Karma:

```bash
karma start
```

## Documentation
### Environment variables
- ELECTRON_BIN - Override path to use for `electron`
    - By default, we will use path given by `electron`

**Example:**

```bash
ELECTRON_BIN=/usr/bin/electron karma start
```

### Script configuration
We support the following configurations:

- client `Object` - Container for configuring child windows loaded from Karma
    - __filenameOverride `String` - Override `__filename` to be another path (e.g. `/path/to/my-index.html`)
        - This will also affect `__dirname` and `module.filename` as those are derived from `__filename`
        - By default, `__filename` will point to Karma's `context.html`
    - loadScriptsViaRequire `Boolean` - Load scripts via `require` instead of `<script src=`
        - This sets `__filename`, `__dirname`, and `module` to match the script instead of Karma's `context.html`
        - By default, this is `false` and we directly load the original scripts content

**Example:**

```js
module.exports = function (config) {
  config.set({
    client: {
      // DEV: These 2 options aren't typically used together
      //   This is for demonstration purposes

      // Override top level `__filename` to be `/home/.../my-electron-app/index.html`
      //   where `__dirname` is `/home/.../my-electron-app`
      __filenameOverride: __dirname + '/index.html',

      // Use `require` instead of `<script src=` to load scripts
      loadScriptsViaRequire: true
    }
  });
};
```

### Launcher configuration
We support configuration via Karma's custom launcher inheritance:

- flags `Array` - List of Chromium flags to alter Electron's behavior
    - https://github.com/atom/electron/blob/v0.36.9/docs/api/chrome-command-line-switches.md
    - We added support for a `--show` to allow making the Karma window visible
- userDataDir `String` - Directory to store cookies/localStorage information
    - By default, this is a random directory generated by Karma (e.g. `/tmp/karma-5355024`)
- require `String` - Path to a main Electron process file to require before calling `app.on('ready')`

**Example:**

```js
module.exports = function (config) {
  config.set({
    // Specify usage of our custom launcher
    browsers: ['CustomElectron'],

    // Define a custom launcher which inherits from `Electron`
    customLaunchers: {
      CustomElectron: {
        base: 'Electron',
        userDataDir: __dirname + '/.electron',
        flags: ['--show'],
        require: __dirname + '/main-fixtures.js'
      }
    }
  });
};
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via `npm run lint` and test via `npm test`.

## Donating
Support this project and [others by twolfson][twolfson-projects] via [donations][twolfson-support-me].

<http://twolfson.com/support-me>

[twolfson-projects]: http://twolfson.com/projects
[twolfson-support-me]: http://twolfson.com/support-me

## Unlicense
As of Mar 03 2016, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
