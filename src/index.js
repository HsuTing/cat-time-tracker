#!/usr/bin/env node
'use strict';

import 'babel-polyfill';
import fs from 'fs';
import path from 'path';
import process from 'process';
import chalk from 'chalk';

import addConfig from './addConfig';
import firebaseInit from './firebase/init';
import {
  add as addUser,
  login as userLogin
} from './firebase/user.js';
import {
  setting as getSetting,
  todo as getTodo
} from './firebase/get';
import getPkg from './getPkg';

import addTimeTracker from './addTimeTracker';
import addTodo from './addTodo';

const keys = [
  'apiKey',
  'authDomain',
  'databaseURL',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'email',
  'password'
];


// check path
let root = process.cwd();
let check_config = fs.existsSync(path.resolve(root, '.time-tracker.json'));
let temp_root = process.cwd();

do {
  check_config = check_config || fs.existsSync(path.resolve(temp_root, '.time-tracker.json'));

  if(fs.existsSync(path.resolve(temp_root, '.git')) && check_config)
    console.error(chalk.red('warning: ".time-tracker.json" should not be included in git.'));

  temp_root = path.resolve(temp_root, './../');

  if(!check_config)
    root = temp_root;
} while(temp_root !== '/')


// main function
(async () => {
  const command = process.argv[2];
  let interval = null;

  try {
    const {needToAddUser, email, password, ...config} = root === '/' ?
      (await addConfig(keys)) :
      require(path.resolve(root, '.time-tracker.json'));

    firebaseInit(config);
    if(needToAddUser)
      await addUser(email, password);
    await userLogin(email, password)

    switch((command || '').toLowerCase()) {
      case 'init':
        if(root !== '/')
          console.log(`${chalk.cyan('Find ".time-tracker.json":')} ${root}/.time-tracker.json`);
        break;

      case 'todo': {
        const pkg = await getPkg();
        const setting = await getSetting();

        await addTodo(pkg, setting);
        break;
      }

      default: {
        const setting = await getSetting();
        const pkg = await getPkg();
        const todo = await getTodo(pkg);

        interval = await addTimeTracker(pkg, setting, todo);
        break;
      }
    }
  } catch(e) {
    console.log(e);
  }

  if(!interval)
    process.exit();
})();
