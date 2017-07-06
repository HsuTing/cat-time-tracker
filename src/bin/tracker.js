#!/usr/bin/env node
'use strict';

import 'babel-polyfill';
import chalk from 'chalk';
import moment from 'moment';

import Store from './../Store';
import shell from './../shell';

(() => {
  // start
  console.log(`
    ${chalk.cyan(`
    ┏━━━━━━━━━━━━━━━━━━━━━━┓
    ┃                      ┃
    ┃  Time tracker start  ┃
    ┃                      ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━┛
    `)}
    ${chalk.cyan('add')} ${chalk.cyan('\\a')}
      add the note in your time tracker
    ${chalk.cyan('show')} ${chalk.cyan('\\s')}
      show time tracker
    ${chalk.cyan('count')} ${chalk.cyan('\\c')}
      count the duration between now and the previous note
    ${chalk.cyan('exit')} ${chalk.cyan('\\q')}
      stop tracker


    This is ${chalk.bgCyan(` ${Store.user.name} `)}\`s time tracker.
  `);

  Store.addTime('Time tarcker start', moment().format(), 'normal');

  shell();
})();
