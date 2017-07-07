'use strict';

import process from 'process';
import moment from 'moment';
import chalk from 'chalk';

import Store from './../Store';
import defaultStore from './../../data/defaultStore.json';

const {tags, timerColor} = Store.store;

export const getDiffTime = (startTime, endTime) => {
  const diff = endTime.format('x') - startTime.format('x');
  const diffTime = moment.duration(diff);

  return `${diffTime.hours()} hr ${diffTime.minutes()} min ${diffTime.seconds()} sec`;
};

export const printTime = (tag, note, time) => {
  const outputTag = `${chalk.whiteBright.bold[ tags[tag] || defaultStore.tags.normal ](` ${tag} `)}`;
  const outputTime = `${chalk[ timerColor || defaultStore.timerColor ](`(${time})`)}`;

  return process.env.TEST ? '' : `${outputTag} ${outputTime} ${note}`;
};
