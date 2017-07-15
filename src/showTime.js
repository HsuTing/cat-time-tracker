'use strict';

import chalk from 'chalk';
import moment from 'moment';

import {getDiffTime, printTime} from 'utils/time';
import {getOptions} from 'utils/argv';
import {getCommits} from 'utils/git';

import Store from './Store';
import defaultSetting from './../data/defaultSetting.json';

const {time} = Store;
const {format} = Store.store;

let limit = 5;

export default async originOptions => {
  const options = getOptions(['limit'], originOptions);
  const outputTime = [...time].slice(0, options.limit || limit).reverse();
  const outputFormat = format || defaultSetting.format;
  const commits = (await getCommits(options.limit || limit)).filter(commit => (
    outputTime.length === 0 ?
      false :
      moment(commit.date).format('x') > moment(outputTime[0].endTime).format('x')
  ));
  let commitIndex = 0;
  console.log(commits.length);

  outputTime.forEach(({
    id,
    tag,
    note,
    startTime,
    endTime
  }, index) => {
    const isEnd = index === outputTime.length - 1;
    let nowCommit = commits[commitIndex];

    console.log(`${isEnd ? '┗ ' : '┣ '}┳  ${chalk.yellow(id)}`);
    console.log(`${isEnd ? '  ' : '┃ '}┣  Start ${moment(startTime).format(outputFormat)}`);
    console.log(`${isEnd ? '  ' : '┃ '}┣  End   ${moment(endTime).format(outputFormat)}`);
    console.log(`${isEnd ? '  ' : '┃ '}┗  ${printTime(
      tag,
      '',
      getDiffTime(
        moment(startTime),
        moment(endTime)
      )
    )}`);
    console.log(`${isEnd ? '  ' : '┃ '}`);
    console.log(`${isEnd ? '  ' : '┃ '}   ${note}`);
    console.log(`${isEnd ? '  ' : '┃ '}`);

    if(!isEnd &&
      nowCommit &&
      moment(nowCommit.date).format('x') > moment(startTime).format('x') &&
      moment(nowCommit.date).format('x') < moment(outputTime[index + 1].startTime).format('x')
    ) {
      do {
        console.log(`* ${
          chalk.yellow(nowCommit.id)
        } ${
          moment(nowCommit.date).format(outputFormat)
        } ${
          chalk.green(Store.user.name)
        } ${
          nowCommit.note
        }`);

        commitIndex = commitIndex + 1;

        if(commitIndex >= commits.length)
          break;

        nowCommit = commits[commitIndex];
      } while(moment(nowCommit.date).format('x') < moment(outputTime[index + 1].startTime).format('x'))

      console.log(`${isEnd ? '  ' : '┃ '}`);
    }
  });
};
