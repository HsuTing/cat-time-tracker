'use strict';

import chalk from 'chalk';
import moment from 'moment';

import {getDiffTime, printTime} from 'utils/time';
import {getOptions} from 'utils/argv';

import Store from './Store';
import defaultSetting from './../data/defaultSetting.json';

const {time} = Store;
const {format} = Store.store;

let limit = 5;

export default originOptions => {
  const options = getOptions(['limit'], originOptions);
  const outputTime = [...time].slice(0, options.limit || limit);

  outputTime.reverse().forEach(({
    id,
    tag,
    note,
    startTime,
    endTime
  }, index) => {
    const isEnd = index === outputTime.length - 1;

    console.log(`${isEnd ? '┗ ' : '┣ '}┳  ${chalk.yellow(id)}`);
    console.log(`${isEnd ? '  ' : '┃ '}┣  ${moment(startTime).format(format || defaultSetting.format)}`);
    console.log(`${isEnd ? '  ' : '┃ '}┗  ${printTime(
      tag,
      '',
      getDiffTime(
        moment(startTime),
        moment(endTime)
      )
    )}`);
    console.log(`${isEnd ? '  ' : '┃ '}`);
    console.log(`${isEnd ? '  ' : '┃ '}   ${note}`);
    console.log(`${isEnd ? '  ' : '┃ '}`);
  });
};
