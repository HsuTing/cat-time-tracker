'use strict';

import moment from 'moment';
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

export const todo = async ({name}, statusArray = ['done']) => {
  const snapshot = await firebase.database().ref(`/projects/${name}/todo/`).once('value');
  const value = snapshot.val();

  return value ? Object.keys(value).map(key => ({
    id: key,
    ...value[key]
  })).filter(({status}) => statusArray.includes(status)) : [];
};

export const todoById = async ({name}, id) => {
  const snapshot = await firebase.database().ref(`/projects/${name}/todo/${id}/`).once('value');

  return {
    id,
    ...snapshot.val()
  };
};

export const time = async ({name}) => {
  const snapshot = await firebase.database().ref(`/projects/${name}/time/`).once('value');
  const value = snapshot.val();

  return value ? Object.keys(value).map(key => ({
    todo_id: value[key].id,
    ...value[key],
    id: key
  })).sort((a, b) => {
    return moment(b.end).format('x') - moment(a.end).format('x')
  }) : [];
};
