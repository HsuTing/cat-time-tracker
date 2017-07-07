'use strict';

require('babel-polyfill');
const process = require('process');
const should = require('should');

const modifyTime = require('./../lib/modifyTime').default;
const data = require('./../.time-tracker/HsuTing.json');

process.env.TEST = true;

describe('modifyTime', () => {
  it('# id exist', () => {
    return modifyTime([
      `--id=${Object.keys(data.time)[0]}`,
      '--note=note'
    ]).should.be.finally.true();
  });

  it('# id not exist', () => {
    return modifyTime([
      '--id=id',
      '--note=note'
    ]).should.be.rejected();
  });
});
