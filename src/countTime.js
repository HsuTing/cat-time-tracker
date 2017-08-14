'use strict';

import moment from 'moment';
import chalk from 'chalk';

import {
  time as getTime
} from './firebase/get';

export default async ({name}, {timerColor, tags}) => {
  const output = (await getTime({name}))
    .reduce((total, {tag, start, end}) => {
      total[tag] = (total[tag] || 0) + (
        moment(end).format('x') - moment(start).format('x')
      );

      return total;
    }, {});

  Object.keys(output).forEach(tag => {
    const diffTime = moment.duration(output[tag]);
    const hours = diffTime.days() * 24 + diffTime.hours();
    const minutes = diffTime.minutes();
    const seconds = diffTime.seconds();

    console.log(`${
      chalk.whiteBright.bold[ tags[tag] ](` ${tag} `)
    } ${
      chalk[ timerColor ](`(${hours} hr ${minutes} min ${seconds} sec)`)
    }`);
  });
};
