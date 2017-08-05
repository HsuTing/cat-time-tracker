'use strict';

import todo from './getTodo';
import toggleTodo from './toggleTodo';

export default {
  query: {
    todo
  },

  mutation: {
    toggleTodo
  }
};
