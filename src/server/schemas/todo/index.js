'use strict';

import todo from './getTodo';
import modifyTodo from './modifyTodo';

export default {
  query: {
    todo
  },

  mutation: {
    modifyTodo
  }
};
