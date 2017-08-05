'use strict';

import {
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString
} from 'graphql';
import {
  mutationWithClientMutationId,
  fromGlobalId
} from 'graphql-relay';

import {newTimeTracker} from 'db/set';
import checkTime from 'db/checkTime';

export default mutationWithClientMutationId({
  name: 'AddTime',
  description: 'Add the data of the Time.',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'This is the id of the Time.'
    },
    tag: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'This is the tag of the Time.'
    },
    note: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'This is the note of the Time.'
    },
    start: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'This is the start time of the Time.'
    },
    end: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'This is the end time of the Time.'
    }
  },
  outputFields: {
    status: {
      description: 'Use to check if adding the Time successes.',
      type: GraphQLBoolean
    }
  },
  mutateAndGetPayload: async (args, {name}) => {
    const data = {
      ...args,
      id: fromGlobalId(args.id).id
    };

    if(await checkTime(name, data))
      return {
        status: (await newTimeTracker(name, data))
      };

    return {
      status: false
    };
  }
});
