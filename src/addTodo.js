'use strict';

import chalk from 'chalk';
import inquirer from 'inquirer';

import {
  todo as setTodo
} from './firebase/set';

export default async ({name}, {tags}) => {
  const {note, tag} = await inquirer.prompt([{
    name: 'note',
    message: 'Add note',
    validate: note => note ? true : 'Can not be empty.'
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

  await setTodo(name, {note, tag});
};
