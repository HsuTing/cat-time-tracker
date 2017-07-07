'use strict';

import path from 'path';
import process from 'process';
import memFs from 'mem-fs';
import editor from 'mem-fs-editor';
import moment from 'moment';
import gitConfig from 'git-config';

const config = gitConfig.sync();

if(!config.user || !config.user.name)
  throw new Error('You muse set "user.name" in ".gitconfig". Use `git config --global user.name "username"` to set it.');

const filePath = path.resolve(process.cwd(), '.time-tracker', `${config.user.name}.json`);

class Store {
  constructor() {
    this.store = {};
    this.user = config.user;

    try {
      this.store = require(filePath);
    } catch(e) {
      this.store = require('./../data/defaultStore.json');
    }
  }

  addTime(id, tag, note, newTime, callback = () => {}) {
    const store = memFs.create();
    const fs = editor.create(store);

    this.store.time[id] = {
      note,
      tag,
      startTime: this.store.time[id] ? this.store.time[id].startTime : newTime,
      endTime: newTime
    }

    fs.write(
      filePath,
      JSON.stringify(this.store, null, 2)
    );

    fs.commit(err => {
      if(err)
        throw new Error(err);

      callback();
    });
  }

  get time() {
    return Object.keys(this.store.time)
      .map(id => ({
        id,
        ...this.store.time[id]
      }))
      .sort((a, b) => (
        moment(b.endTime).format('x') - moment(a.endTime).format('x')
      ));
  }
}

export default new Store();
