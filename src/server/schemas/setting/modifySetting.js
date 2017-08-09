'use strict';

import {
  GraphQLString
} from 'graphql';
import {mutationWithClientMutationId} from 'graphql-relay';

import dataType, {dataFields} from './dataType';

export default mutationWithClientMutationId({
  name: 'ModfiySetting',
  description: 'Modify the Setting.',
  inputFields: {
    ...dataFields.fields,
    tags: {
      ...dataFields.fields.tags,
      type: GraphQLString
    }
  },
  outputFields: {
    setting: {
      type: dataType,
      description: 'This is a new Setting.'
    }
  },
  mutateAndGetPayload: async (args, {name}) => {
    console.log(args);
    return {
    };
  }
});
