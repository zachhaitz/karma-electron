# Submodules
We currently don't support sharing the same `window` context with submodules (e.g. `require('./abc')`). We have a pull request to repair support by making the necessary patches in Karma but it's still under review:

https://github.com/karma-runner/karma/pull/1984

As a workaround, there are a few options:

- Use the patched version of `karma`. This can be done via the following:
    - Move to patched dependencies:
        - `"karma": "https://github.com/twolfson/karma/releases/download/dev%2Fpersonal.mix-16718fd/karma-0.13.22.tgz"`
        - `"karma-electron": "git://github.com/twolfson/karma-electron#9bdfc93"`
        - Be sure to reinstall your node modules after updating these dependencies (i.e. `rm -r node_modules; npm install`)
    - Update configuration to use patch adjustments (e.g. `client.useIframe`)
        - More info here: https://github.com/twolfson/karma-electron/tree/dev/fix.nested.context#getting-started
- Bundle your JavaScript via Browserify or webpack
