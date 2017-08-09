'use strict';

import {mutationWithClientMutationId} from 'graphql-relay';
import {addNonNull} from 'cat-graphql/lib/utils';

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
  inputFields: addNonNull({
    tag,
    note
  }),
  outputFields: {
    todo: {
      description: 'New todo',
      type: todoGroupType
    }
  },
  mutateAndGetPayload: async ({tag, note}, {name}) => {
    const {tags} = await getSetting();

    if(tags[tag] && await setTodo(name, {tag, note}))
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
