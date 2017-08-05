'use strict';

import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import {
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
  globalIdField
} from 'graphql-relay';
import ansiHTML from 'ansi-html';
import chalk from 'chalk';

import fields from 'schemas/fields';

const {nodeInterface} = fields;

const dataType = new GraphQLObjectType({
  name: 'Tags',
  description: 'This is the type of the Tags.',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('Tags'),
    name: {
      type: GraphQLString,
      description: 'This is the name of the Tags.'
    },
    color: {
      type: GraphQLString,
      description: 'This is the color of the Tags.',
      resolve: ({color}) => ansiHTML(chalk[color]('color')).split(/:|;/)[1]
    }
  }
});

const {connectionType: tagsConnection} =
  connectionDefinitions({name: 'tags', nodeType: dataType});

export default dataType;
export const tagsGroupType = new GraphQLObjectType({
  name: 'TagsGroup',
  description: 'This is the type of the Tags group.',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('TagsGroup'),
    tagsGroup: {
      type: tagsConnection,
      description: 'This is the group of the Tags.',
      args: connectionArgs,
      resolve: (data, args) => connectionFromArray(
        Object.keys(data || {}).map(name => ({
          id: name,
          name,
          color: data[name]
        })), args
      )
    }
  }
});
