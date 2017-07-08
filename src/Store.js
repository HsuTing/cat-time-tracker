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

const settingPath = path.resolve(process.cwd(), '.time-tracker', 'setting.json');
const filePath = path.resolve(process.cwd(), '.time-tracker', `${config.user.name}.json`);

class Store {
  constructor() {
    this.store = {};
    this.user = config.user;

    try {
      this.store = {
        ...this.store,
        ...require(settingPath)
      };
    } catch(e) {
      this.store = {
        ...this.store,
        ...require('./../data/defaultSetting.json')
      };
    }

    try {
      this.store = {
        ...this.store,
        ...require(filePath)
      };
    } catch(e) {
      this.store = {
        ...this.store,
        ...require('./../data/defaultStore.json')
      };
    }
  }

  addTime(id, tag, note, newTime) {
    const store = memFs.create();
    const fs = editor.create(store);

    this.store.time[id] = {
      note,
      tag,
      startTime: this.store.time[id] ? this.store.time[id].startTime : newTime,
      endTime: newTime
    }

    const {time, ...setting} = this.store;

    fs.write(
      settingPath,
      JSON.stringify(setting, null, 2)
    );

    fs.write(
      filePath,
      JSON.stringify({time}, null, 2)
    );

    return new Promise((resolve, reject) => {
      fs.commit(err => {
        if(err)
          reject(err);

        resolve(true);
      });
    });
  }

  modifyTime(id, note) {
    const {tag, endTime} = this.store.time[id];

    return this.addTime(id, tag, note, endTime);
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
