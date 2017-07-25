'use strict';

import * as firebase from 'firebase';

const defaultSetting = {
  timerColor: 'gray',
  format: 'MMMM Do YYYY, HH:mm:ss',
  tags: {
    normal: 'bgGreen',
    bug: 'bgRed'
  }
};

export const setting = async () => {
  const snapshot = await firebase.database().ref('/setting/').once('value');
  const value = snapshot.val();

  if(value)
    return value;

  await firebase.database().ref('/setting/').set(defaultSetting);
  return defaultSetting;
};

export const todo = async ({name}) => {
  const snapshot = await firebase.database().ref(`/projects/${name}/todo/`).once('value');
  const value = snapshot.val();

  return value ? Object.keys(value).map(key => ({
    id: key,
    ...value[key]
  })).filter(({status}) => status !== 'done') : [];
};
