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
  setting as getSetting
} from './firebase/get';
import getPkg from './getPkg';
import addTimeTracker from './addTimeTracker';

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

let root = process.cwd();
let check = false;

do {
  check = fs.existsSync(path.resolve(root, '.time-tracker.json'));

  if(!check)
    root = path.resolve(root, './../');
} while(!check && root !== '/')

(async () => {
  const command = process.argv[2];

  try {
    const {needToAddUser, email, password, ...config} = root === '/' ?
      (await addConfig(keys)) :
      require(path.resolve(root, '.time-tracker.json'));

    firebaseInit(config);
    if(needToAddUser)
      await addUser(email, password);
    await userLogin(email, password)

    switch(command) {
      case 'init':
        if(root !== '/')
          console.log(`${chalk.cyan('Find .time-tracker.json:')} ${root}/.time-tracker.json`);
        break;

      default: {
        const setting = await getSetting();
        const pkg = await getPkg();

        await addTimeTracker(pkg, setting);
        break;
      }
    }
  } catch(e) {
    console.log(e);
  }

  process.exit();
})();
