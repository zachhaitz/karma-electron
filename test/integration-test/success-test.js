// Start our tests
describe('A basic operation', function () {
  it('asserts without errors', function () {
    if (1 + 1 !== 2) {
      throw new Error('1 + 1 is not equal to 2');
    }
  });
});
