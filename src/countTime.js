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

  Object.keys(tags).forEach(tag => {
    tagsTotal[tag] = 0;
  });

  const total = Store.time.reduce((nowTotal, {tag, startTime, endTime}) => {
    const count = moment(endTime).format('x') - moment(startTime).format('x');

    tagsTotal[tag] = tagsTotal[tag] + count;
    return nowTotal + count;
  }, 0);

  console.log(`Total: ${chalk.green(outputTime(total))}`);
  console.log();

  Object.keys(tags).forEach(tag => {
    console.log(printTime(
      tag,
      '',
      outputTime(tagsTotal[tag])
    ));
  });
};
