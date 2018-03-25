/* eslint-env mocha */
const expect = require('chai').expect;
const rp = require('request-promise');
require('../sampleAPI/index.js');

describe('test API', () => {
  // start the server
  setTimeout(() => {
    it('returns success', async () => {
      let result = JSON.parse(await rp('http://localhost:3750/api/test'));
      expect(result.success).to.equal(true);
    });

    it('last test', async () => {
      setTimeout(() => {
        process.exit(0);
      }, 100);
    });
  });

  it('is true', () => {
    // somehow need this to make the test to run
    expect(true).to.equal(true);
  });
});
