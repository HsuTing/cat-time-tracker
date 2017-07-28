'use strict';

import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import {mutationWithClientMutationId} from 'graphql-relay';

import dataType from './dataType';

// TODO
export default mutationWithClientMutationId({
  name: 'Todo',
  description: 'Modify the data of the Todo.',
  inputFields: {
    data: {
      description: 'This is the args of the Todo.',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    newData: {
      description: 'This is output data of the Todo after modifying the Todo.',
      type: dataType
    }
  },
  mutateAndGetPayload: (data, ctx) => ({
    newData: {
      data: 'mutation Todo'
    }
  })
});
