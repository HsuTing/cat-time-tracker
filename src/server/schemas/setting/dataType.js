'use strict';

import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import {globalIdField} from 'graphql-relay';

import fields from 'schemas/fields';
import {tagsGroupType} from 'schemas/tags/dataType';

const {nodeInterface} = fields;

export default new GraphQLObjectType({
  name: 'Setting',
  description: 'This is the type of the Setting.',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField('Setting'),
    format: {
      type: GraphQLString,
      description: 'This is the format in the Setting.'
    },
    tags: {
      type: tagsGroupType,
      description: 'This is the tags in the Setting.'
    },
    timerColor: {
      type: GraphQLString,
      description: 'This is the time color in the Setting.'
    }
  })
});
