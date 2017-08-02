'use strict';

import {fromGlobalId} from 'graphql-relay';
import moment from 'moment';
import {
  setting as getSetting,
  todo as getTodo
} from 'firebase/get';

export const getTime = (start, end) => {
  const diff = end.format('x') - start.format('x');
  const diffTime = moment.duration(diff);

  return {
    hours: diffTime.days() * 24 + diffTime.hours(),
    minutes: diffTime.minutes(),
    seconds: diffTime.seconds()
  };
};

export const checkTime = async (name, {
  id,
  tag,
  note,
  start,
  end
}) => {
  const todo = (await getTodo({name}, ['done', 'not done']))
    .concat([{id: 'custom'}])
    .filter(todo => todo.id === fromGlobalId(id).id);

  if(todo.length === 0)
    return false;

  if(!(await getSetting()).tags[tag])
    return false;

  if(note === '')
    return false;

  if(moment(start).format() === 'Invalid date' ||
    moment(end).format() === 'Invalid date')
    return false;

  return true;
};
