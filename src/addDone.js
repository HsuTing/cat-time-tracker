'use strict';

import inquirer from 'inquirer';

import {
  done as setDone
} from './firebase/set';

export default async ({name}, todoChoices) => {
  if(todoChoices.length === 0)
    return;

  const {todo} = await inquirer.prompt([{
    type: 'checkbox',
    name: 'todo',
    message: 'Choose a todo',
    choices: todoChoices.map(todo => ({
      name: todo.note,
      value: todo
    }))
  }]);

  await Promise.all(todo.map(async d => {
    await setDone(name, d);
  }));
};
