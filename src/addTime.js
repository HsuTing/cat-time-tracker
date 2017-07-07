'use strict';

import process from 'process';
import inquirer from 'inquirer';
import moment from 'moment';
import chalk from 'chalk';
import uuid from 'uuid';

import {getDiffTime, printTime} from 'utils/time';
import {getOptions} from 'utils/argv';

import Store from './Store';
import defaultStore from './../data/defaultStore.json';

const {tags} = Store.store;

export default async originOptions => {
  const options = getOptions(['note', 'tag'], originOptions);
  const answers = await inquirer.prompt([{
    name: 'note',
    message: 'Add a note',
    when: !options.note,
    validate: note => note ? true : 'Must add a note.'
  }, {
    type: 'list',
    name: 'tag',
    message: 'Choosa a tag',
    when: !options.tag,
    default: 0,
    choices: Object.keys(tags).map(tag => ({
      name: chalk.bold.whiteBright[ tags[tag] || defaultStore.tags.normal ](` ${tag} `),
      value: tag
    }))
  }]);
  const {note, tag} = {
    ...options,
    ...answers
  };

  if(!Object.keys(tags).includes(tag))
    throw new Error(`${tag}: tag not found`);

  console.log();
  const now = moment();
  const id = uuid.v4();

  await Store.addTime(id, tag, note, moment());

  process.on('SIGINT', async () => {
    if(await Store.addTime(id, tag, note, moment())) {
      console.log();
      process.exit();
    }
  });

  return setInterval(() => {
    process.stdout.write(`\r${printTime(
      tag,
      note,
      getDiffTime(
        now,
        moment()
      ))
    }`);
  }, 1000 / 120);
};
