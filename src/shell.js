'use strict';

import inquirer from 'inquirer';
import moment from 'moment';

import Store from './Store';
import messages from './messages';

import addShell from './add-shell';

const shell = async () => {
  const {command} = await inquirer.prompt([{
    name: 'command',
    message: messages.command()
  }]);

  switch(command) {
    case 'exit':
    case '\\q':
      Store.addTime('Time tracker stop', moment().format());
      return;

    case 'show':
    case '\\s': {
      const outputTime = [...Store.time].slice(0, 20).reverse();
      console.log('\n');
      outputTime.forEach(({name, time, tag}, index) => {
        if(name === 'Time tarcker start' && index !== 0) {
          const diff = moment(time).format('x') - moment(outputTime[index - 1].time).format('x');
          const diffTime = moment.duration(diff);
          console.log(' | ');
          console.log(`${diffTime.hours()} hr ${diffTime.minutes()} min ${diffTime.seconds()} sec`);
          console.log(' | ');
        }
        console.log(messages.show(name, time, tag));
      });
      console.log('\n');
      break;
    }

    case 'add':
    case '\\a':
      return addShell(0, moment().format());

    case 'count':
    case '\\c': {
      const diff = moment().format('x') - moment(Store.time[0].time).format('x');
      const diffTime = moment.duration(diff);
      console.log();
      console.log('The duration between now and the previous note:');
      console.log(`${diffTime.hours()} hr ${diffTime.minutes()} min ${diffTime.seconds()} sec`);
      console.log();
      break;
    }
  }

  shell();
};

export default shell;
