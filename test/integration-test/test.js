// Start our tests
// TODO: Is there a way to test failing scenarios?
//   Like a separate folder for success and failure, then we check exit codes?
describe('A basic operation', function () {
  it('asserts without errors', function () {
    if (1 + 1 !== 2) {
      throw new Error('1 + 1 !== 2');
    }
  });
});
