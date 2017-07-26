'use strict';

import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import {mutationWithClientMutationId} from 'graphql-relay';

import dataType from './dataType';

export default mutationWithClientMutationId({
  name: 'Time',
  description: 'Modify the data of the Time.',
  inputFields: {
    data: {
      description: 'This is the args of the Time.',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    newData: {
      description: 'This is output data of the Time after modifying the Time.',
      type: dataType
    }
  },
  mutateAndGetPayload: (data, ctx) => ({
    newData: {
      data: 'mutation Time'
    }
  })
});
