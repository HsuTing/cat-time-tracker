'use strict';

import path from 'path';
import process from 'process';
import chalk from 'chalk';
import inquirer from 'inquirer';
import memFs from 'mem-fs';
import editor from 'mem-fs-editor';

const store = memFs.create();
const fs = editor.create(store);

export default async (keys = []) => {
  console.log(chalk.cyan('Add the config of firebase'));

  const result = await inquirer.prompt(keys.map(key => ({
    type: key === 'password' ? 'password' : 'text',
    name: key,
    message: key,
    validate: value => value !== '' ? true : 'Can not be empty.'
  })));

  fs.write(
    path.resolve(process.cwd(), '.time-tracker.json'),
    JSON.stringify(result, null, 2)
  );

  return new Promise((resolve, reject) => {
    fs.commit(err => {
      if(err)
        reject(err);

      resolve({
        ...result,
        needToAddUser: true
      });
    });
  });
};
