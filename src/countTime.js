'use strict';

import moment from 'moment';
import chalk from 'chalk';

import Store from './Store';

const {time} = Store;

export default () => {
  const total = time.reduce((a, {startTime, endTime}) => {
    return a + (moment(endTime).format('x') - moment(startTime).format('x'));
  }, 0);
  const totalTime = moment.duration(total);
  const outputTime = `${totalTime.hours()} hr ${totalTime.minutes()} min ${totalTime.seconds()} sec`;

  console.log(`Total: ${chalk.green(outputTime)}`);
};
