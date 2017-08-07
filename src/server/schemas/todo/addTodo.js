'use strict';

import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import {mutationWithClientMutationId} from 'graphql-relay';

import {
  todo as getTodo,
  setting as getSetting,
} from 'db/get';
import {
  todo as setTodo
} from 'db/set';

import {todoGroupType} from './dataType';

export default mutationWithClientMutationId({
  name: 'AddTodo',
  description: 'Add the Todo.',
  inputFields: {
    tag: {
      description: 'This is the tag of the Todo.',
      type: new GraphQLNonNull(GraphQLString)
    },
    note: {
      description: 'This is the note of the Todo.',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
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
