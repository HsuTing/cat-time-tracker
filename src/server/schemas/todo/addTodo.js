'use strict';

import {mutationWithClientMutationId} from 'graphql-relay';
import {inputCheck} from 'cat-components/lib/input-redux';

import todo from 'fields/todo';
import {
  todo as getTodo,
  setting as getSetting,
} from 'db/get';
import {
  todo as setTodo
} from 'db/set';

import {dataFields, todoGroupType} from './dataType';

const {tag, note} = dataFields.fields;

export default mutationWithClientMutationId({
  name: 'AddTodo',
  description: 'Add the Todo.',
  inputFields: {
    tag,
    note
  },
  outputFields: {
    todo: {
      description: 'New todo',
      type: todoGroupType
    }
  },
  mutateAndGetPayload: async (args, {name}) => {
    const {tags} = await getSetting();

    const check = todo.map(({name, rules}, index) => {
      return inputCheck(args[name], rules);
    }).reduce((nowCheck, {isError}) => {
      return nowCheck || isError;
    }, false);

    if(!check && tags[args.tag] && await setTodo(name, args))
      return {
        todo: [{
          id: 'custom',
          status: '',
          tag: '',
          note: 'custom todo'
        }].concat(await getTodo({name}, ['done', 'not done']))
      };

    return {
      todo: {
        status: false
      }
    };
  }
});
