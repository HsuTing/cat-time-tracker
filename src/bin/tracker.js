#!/usr/bin/env node
'use strict';

import 'babel-polyfill';
import process from 'process';
import chalk from 'chalk';

import Store from './../Store';
import addTime from './../addTime';
import showTime from './../showTime';
import modifyTime from './../modifyTime';

(() => {
  // start
  console.log(`${chalk.cyan(`
┏━━━━━━━━━━━━━━━┓
┃               ┃
┃  Time tracker ┃
┃               ┃
┗━━━━━━━━━━━━━━━┛
`)}
This is ${chalk.bgCyan(` ${Store.user.name} `)}\`s time tracker.
  `);

  const command = process.argv[2];

  switch(command) {
    case 'show': return showTime(process.argv.slice(3));
    case 'modify': return modifyTime(process.argv.slice(3));
    default: return addTime(process.argv.slice(2));
  }
})();
