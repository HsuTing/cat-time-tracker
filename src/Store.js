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

  addTime(name, newTime, tag) {
    const {time} = this.store;
    const store = memFs.create();
    const fs = editor.create(store);

    this.store.time = [{
      name,
      time: newTime,
      tag
    }].concat(time).sort((a, b) => {
      return moment(b.time).format('x') - moment(a.time).format('x');
    });

    fs.write(
      filePath,
      JSON.stringify(this.store, null, 2)
    );

    fs.commit(err => {
      if(err)
        throw new Error(err);
    });
  }

  get time() {
    return this.store.time;
  }
}

export default new Store();
