'use strict';

import chalk from 'chalk';
import moment from 'moment';
import inquirer from 'inquirer';

import {getTime} from 'utils/time';

import {
  newTimeTracker as setNewTimeTracker
} from './firebase/set';

export default async ({name}, {timerColor, tags}, todoChoices) => {
  const {todo, ...result} = await inquirer.prompt([{
    type: 'list',
    name: 'todo',
    message: 'Choose a todo',
    default: 'custom',
    choices: todoChoices.map(todo => ({
      name: todo.note,
      value: todo
    })).concat([{
      name: 'custom',
      value: 'custom'
    }]),
    when: todoChoices.length !== 0
  }, {
    name: 'note',
    message: 'Add a note',
    validate: note => note ? true : 'Must add a note.',
    when: ({todo}) => todoChoices.length === 0 || todo === 'custom'
  }, {
    type: 'list',
    name: 'tag',
    message: 'Choosa a tag',
    default: 0,
    choices: Object.keys(tags).map(tag => ({
      name: chalk.bold.whiteBright[ tags[tag] ](` ${tag} `),
      value: tag
    })),
    when: ({todo}) => todoChoices.length === 0 || todo === 'custom'
  }]);

  const {id, note, tag} = todo === 'custom' ? {
    id: 'custom',
    ...result
  } : todo;
  const start = moment();

  process.on('SIGINT', async () => {
    if(await setNewTimeTracker(name, {
      id,
      note,
      tag,
      start: start.format(),
      end: moment().format()
    })) {
      console.log();
      process.exit();
    }
  });

  return setInterval(() => {
    const end = moment();
    const {hours, minutes, seconds} = getTime(start, end);

    process.stdout.write(`\r${
      chalk.whiteBright.bold[ tags[tag] ](` ${tag} `)
    } ${
      chalk[ timerColor ](`(${hours} hr ${minutes} min ${seconds} sec)`)
    } ${
      note
    }`);
  }, 1000 / 120);
};
