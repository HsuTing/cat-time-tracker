'use strict';

import should from 'should'; // eslint-disable-line no-unused-vars
import fetch from 'fetch-everywhere';

import pages from 'constants/pages';

let server = null;

describe('pages', () => {
  before(() => {
    server = require('./../openServer').default(8000);
  });

  pages.forEach(({path}) => {
    it(path, () => fetch(`http://localhost:8000${path}`)
      .then(res => res.status)
      .should.be.eventually.equal(200));
  });

  after(() => {
    server.close();
  });
});
