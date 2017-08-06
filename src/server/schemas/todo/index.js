'use strict';

import todo from './getTodo';
import toggleTodo from './toggleTodo';
import addTodo from './addTodo';

export default {
  query: {
    todo
  },

  mutation: {
    toggleTodo,
    addTodo
  }
};
