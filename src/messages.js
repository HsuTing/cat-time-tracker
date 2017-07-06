'use strict';

import moment from 'moment';
import chalk from 'chalk';

import Store from './Store';

const {format, tags} = Store.store;

export default {
  command: time => `${chalk.green('[time tracker]')} ${chalk.gray(moment(time).format(`(${format})`))}`,
  show: (
    name, time, tag = 'normal'
  ) => (
    `${chalk[tags[tag] || 'bgGreen'](` # ${moment(time).format(format)} `)} ${name}`
  ),
  add: index => ([
    'Add a note',
    'Choose a tag'
  ])[index]
};
