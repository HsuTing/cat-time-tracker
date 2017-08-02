'use strict';

import moment from 'moment';
import {
  setting as getSetting,
  todo as getTodo
} from './get';

export default async (name, {
  id,
  tag,
  note,
  start,
  end
}) => {
  const todo = (await getTodo({name}, ['done', 'not done']))
    .concat([{id: 'custom'}])
    .filter(todo => todo.id === id);

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
