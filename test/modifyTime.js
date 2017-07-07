'use strict';

require('babel-polyfill');
const process = require('process');
const should = require('should');

const modifyTime = require('./../lib/modifyTime').default;

process.env.TEST = true;

describe('modifyTime', () => {
  it('# id not exist', () => {
    return modifyTime([
      '--id=id',
      '--note=note'
    ]).should.be.rejected();
  });
});
