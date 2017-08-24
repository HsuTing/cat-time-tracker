'use strict';

import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import {globalIdField} from 'graphql-relay';

import fields from 'schemas/fields';
import {tagsGroupType} from 'schemas/tags/dataType';

const {nodeInterface} = fields;

export const dataFields = {
  name: 'Setting',
  description: 'This is the type of the Setting.',
  fields: {
    format: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'This is the format in the Setting.'
    },
    tags: {
      type: new GraphQLNonNull(tagsGroupType),
      description: 'This is the tags in the Setting.'
    },
    timerColor: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'This is the time color in the Setting.'
    }
  }
};

export default new GraphQLObjectType({
  ...dataFields,
  interfaces: [nodeInterface],
  fields: {
    ...dataFields.fields,
    id: globalIdField('Setting')
  }
});
