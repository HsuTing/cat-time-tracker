'use strict';

import * as firebase from 'firebase';

export const setting = async ({
  timerColor,
  format,
  tags
}) => {
  await firebase.database().ref('/setting/').set({
    timerColor,
    format,
    tags
  });

  return true;
};

export const newTimeTracker = async (name, {
  id,
  tag,
  note,
  start,
  end
}) => {
  const timeRef = firebase.database().ref(`/projects/${name}/time/`);
  const newRef = timeRef.push();

  await newRef.set({
    id,
    tag,
    note,
    start,
    end
  });

  return id;
};

export const todo = async (name, {
  tag,
  note
}) => {
  const todoRef = firebase.database().ref(`/projects/${name}/todo/`);
  const newRef = todoRef.push();

  await newRef.set({
    status: 'not done',
    tag,
    note
  });

  return true;
};

export const toggleTodo = async (name, {
  id,
  status
}) => {
  await firebase.database().ref(`/projects/${name}/todo/${id}`)
    .update({status});

  return true;
};

export const done = async (name, {
  id
}) => {
  await firebase.database().ref(`/projects/${name}/todo/${id}`)
    .update({status: 'done'});

  return true;
};
