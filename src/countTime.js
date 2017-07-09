'use strict';

import moment from 'moment';
import chalk from 'chalk';

import {printTime} from 'utils/time';

import Store from './Store';

const {tags} = Store.store;

const outputTime = time => {
  const output = moment.duration(time);
  return `${output.hours()} hr ${output.minutes()} min ${output.seconds()} sec`;
};

export default () => {
  const tagsTotal = {...tags};
  const today = moment();
  let todayTotal = 0;

  Object.keys(tags).forEach(tag => {
    tagsTotal[tag] = 0;
  });

  const total = Store.time.reduce((nowTotal, {tag, startTime, endTime}) => {
    const start = moment(startTime);
    const count = moment(endTime).format('x') - start.format('x');

    if(start.format('YYYY-MM-DD') === today.format('YYYY-MM-DD'))
      todayTotal = todayTotal + count;

    tagsTotal[tag] = tagsTotal[tag] + count;
    return nowTotal + count;
  }, 0);

  console.log(`Total: ${chalk.green(outputTime(total))}`);
  console.log(`Today: ${chalk.green(outputTime(todayTotal))}`);
  console.log();

  Object.keys(tags).forEach(tag => {
    console.log(printTime(
      tag,
      '',
      outputTime(tagsTotal[tag])
    ));
  });
};
