'use strict';

import fetch from 'fetch-everywhere';

import pages from 'constants/pages';

describe('pages', () => {
  let server = null;
  beforeAll(() => {
    server = require('./../openServer').default(8000);
  });

  pages.forEach(({path}) => {
    it(path, () => expect(
      fetch(`http://localhost:8000${path}`)
        .then(res => res.status)
    ).resolves.toBe(200));
  });

  afterAll(() => {
    server.close();
  });
});
