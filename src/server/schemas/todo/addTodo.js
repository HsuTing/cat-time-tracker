'use strict';

import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';
import {mutationWithClientMutationId} from 'graphql-relay';

import {
  setting as getSetting,
} from 'db/get';
import {
  todo as setTodo
} from 'db/set';

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
    status: {
      description: 'Use to check if adding the Todo successes.',
      type: GraphQLBoolean
    }
  },
  mutateAndGetPayload: async ({tag, note}, {name}) => {
    const {tags} = await getSetting();

    if(tags[tag] && await setTodo(name, {tag, note}))
      return {
        status: true
      };

    return {
      status: false
    };
  }
});
