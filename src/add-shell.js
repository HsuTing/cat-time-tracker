'use strict';

import inquirer from 'inquirer';

import shell from './shell';
import messages from './messages';
import Store from './Store';

const {tags} = Store.store;

const addShell = async (count, time, options = []) => {
  const prompt = [];

  switch(count) {
    case 1:
      prompt.push({
        type: 'list',
        name: 'command',
        message: messages.add(count),
        default: 0,
        choices: Object.keys(tags)
      });
      break;

    default:
      prompt.push({
        name: 'command',
        message: messages.add(count)
      });
      break;
  }

  const {command} = await inquirer.prompt(prompt);
  options.push(command);

  if(count >= 1) {
    const [note, tag] = options;
    Store.addTime(note, time, tag);
    return shell();
  }

  addShell(count + 1, time, options);
};

export default addShell;
