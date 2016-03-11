// Start our tests
describe('An invalid assertion', function () {
  it('raises an error', function () {
    // jscs:disable disallowYodaConditions
    if (1 !== 2) {
      throw new Error('1 !== 2');
    }
    // jscs:enable disallowYodaConditions
  });
});
