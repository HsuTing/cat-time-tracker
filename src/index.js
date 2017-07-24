#!/usr/bin/env node
'use strict';

import 'babel-polyfill';
import fs from 'fs';
import path from 'path';
import process from 'process';

import addConfig from './addConfig';
import firebaseInit from './firebase/init';
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
  'messagingSenderId'
];

let root = process.cwd();
let check = false;

do {
  check = fs.existsSync(path.resolve(root, '.time-tracker.json'));

  if(!check)
    root = path.resolve(root, './../');
} while(!check && root !== '/')

(async () => {
  try {
    const config = root === '/' ?
      (await addConfig(keys)) :
      require(path.resolve(root, '.time-tracker.json'));
    const pkg = getPkg();

    firebaseInit(config);

    const setting = await getSetting();

    await addTimeTracker(pkg, setting);
  } catch(e) {
    console.log(e);
  }
})();
