'use strict';

import chalk from 'chalk';
import moment from 'moment';
import inquirer from 'inquirer';

import {
  newTimeTracker as setNewTimeTracker
} from './firebase/set';

export default async ({name}, {timerColor, format, tags}) => {
  const {note, tag} = await inquirer.prompt([{
    name: 'note',
    message: 'Add a note',
    validate: note => note ? true : 'Must add a note.'
  }, {
    type: 'list',
    name: 'tag',
    message: 'Choosa a tag',
    default: 0,
    choices: Object.keys(tags).map(tag => ({
      name: chalk.bold.whiteBright[ tags[tag] ](` ${tag} `),
      value: tag
    }))
  }]);

  const start = moment();
  process.on('SIGINT', async () => {
    if(await setNewTimeTracker({
      name,
      note,
      tag,
      start: start.format(format),
      end: moment().format(format)
    })) {
      console.log();
      process.exit();
    }
  });

  setInterval(() => {
    const end = moment();
    const diff = end.format('x') - start.format('x');
    const diffTime = moment.duration(diff);

    process.stdout.write(`\r${
      chalk.whiteBright.bold[ tags[tag] ](` ${tag} `)
    } ${
      chalk[ timerColor ](`(${
        diffTime.days() * 24 + diffTime.hours()
      } hr ${
        diffTime.minutes()
      } min ${
        diffTime.seconds()
      } sec)`)
    } ${
      note
    }`);
  }, 1000 / 120);
};
