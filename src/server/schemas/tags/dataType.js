'use strict';

import {
  GraphQLNonNull,
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

export const dataFields = {
  name: 'Tags',
  description: 'This is the type of the Tags.',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'This is the name of the Tags.'
    },
    color: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'This is the color of the Tags.',
      resolve: ({color}) => ansiHTML(chalk[color]('color')).split(/:|;/)[1]
    }
  }
};

const dataType = new GraphQLObjectType({
  ...dataFields,
  interfaces: [nodeInterface],
  fields: {
    ...dataFields.fields,
    id: globalIdField('Tags')
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
