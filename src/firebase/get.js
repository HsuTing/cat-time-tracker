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
