// Load in our dependencies
var assert = require('assert');
var request = require('request');
var convertSourceMap = require('convert-source-map');

// Start our tests
describe('A file with a source map loaded with karma-electron', function () {
  before(function retrieveHttpFile (done) {
    // Retrieve karma-electron processed HTTP body
    var that = this;
    request('http://localhost:9876/base/source-map-test.js', function handleRequest (err, res, body) {
      that.httpBody = body;
      done(err);
    });
  });
  after(function cleanup () {
    delete this.httpBody;
  });

  it('extends its source map', function () {
    // Load in our HTTP lines
    var generatedContent = this.httpBody;
    var generatedSourcemap = convertSourceMap.fromComment(generatedContent).toObject();

    // Verify our original contents are in the source map
    // {version: 3, sources: ['path/to/source-map-test.js', ...], names: [], mappings: 'AAAA;...', file: 'generated.js',
    //   sourceRoot: '', sourcesContent: ['(function () {...', ...]}
    assert.strictEqual(generatedSourcemap.sources.length, 2);
    assert(generatedSourcemap.sources[1].endsWith('source-map-test.js'));
    assert.strictEqual(generatedSourcemap.sourcesContent.length, 2);
    assert.notEqual(generatedSourcemap.sourcesContent[1].indexOf('generatedContent'), -1);
  });
});
// Via https://github.com/thlorenz/convert-source-map
// jscs:disable
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQvZm9vLm1pbi5qcyIsInNvdXJjZXMiOlsic3JjL2Zvby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIvIn0=
