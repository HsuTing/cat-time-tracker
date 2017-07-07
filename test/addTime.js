'use strict';

require('babel-polyfill');
const process = require('process');
const should = require('should');

const addTime = require('./../lib/addTime').default;

process.env.TEST = true;

describe('addTime', () => {
  it('# tag normal', () => {
    return addTime([
      '--note=note',
      '--tag=normal'
    ]).should.be.finally.Object(setInterval(() => {
    }, 1000 / 120));
  });

  it('# tag not-exist', () => {
    return addTime([
      '--note=note',
      '--tag=not-exist'
    ]).should.be.rejected();
  });
});
