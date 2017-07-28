'use strict';

import {
  todo as getTodo
} from 'db/get';

import getPkg from './../../../getPkg';
import {todoGroupType} from './dataType';

export default {
  description: 'Get the data of the Todo.',
  type: todoGroupType,
  resolve: async () => [{
    id: 'custom',
    status: '',
    tag: '',
    note: 'custom todo'
  }].concat(await getTodo(await getPkg(), ['done', 'not done']))
};
