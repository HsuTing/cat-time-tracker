'use strict';

import inquirer from 'inquirer';
import moment from 'moment';

import {printTime} from 'utils/time';
import {getOptions} from 'utils/argv';

import Store from './Store';
import defaultStore from './../data/defaultStore.json';

const {format} = Store.store;

export default async originOptions => {
  const options = getOptions(['id', 'note'], originOptions);
  const answers = await inquirer.prompt([{
    type: 'list',
    name: 'id',
    message: 'Choose a item',
    when: !options.id,
    default: 0,
    pageSize: 10,
    choices: Store.time.map(({id, tag, note, startTime}) => ({
      name: printTime(
        tag, note,
        moment(startTime).format(format || defaultStore.format)
      ),
      value: id
    }))
  }, {
    name: 'note',
    message: 'Add a new note',
    when: !options.note
  }]);

  const {id, note} = {
    ...options,
    ...answers
  };

  if(!Store.store.time[id])
    throw new Error(`${id}: id not found`);

  return await Store.modifyTime(id, note);
};
