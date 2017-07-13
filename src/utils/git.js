'use strict';

import moment from 'moment';
import gitlog from 'gitlog';

import Store from './../Store';

export const getCommits = number => new Promise((resolve, reject) => {
  gitlog({
    repo: process.cwd(),
    number: number * 2,
    author: Store.user.name,
    fields: [
      'abbrevHash',
      'subject',
      'committerDate'
    ]
  }, (error, commits) => {
    if(error)
      return reject(error);

    resolve(commits.map(({abbrevHash, subject, committerDate}) => ({
      type: 'git',
      id: abbrevHash,
      note: subject,
      date: moment(new Date(committerDate))
    })).reverse());
  });
});
