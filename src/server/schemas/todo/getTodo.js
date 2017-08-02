'use strict';

import {
  todo as getTodo
} from 'db/get';

import {todoGroupType} from './dataType';

export default {
  description: 'Get the data of the Todo.',
  type: todoGroupType,
  resolve: async (parent, args, {name}) => [{
    id: 'custom',
    status: '',
    tag: '',
    note: 'custom todo'
  }].concat(await getTodo({name}, ['done', 'not done']))
};
