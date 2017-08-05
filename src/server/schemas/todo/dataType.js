'use strict';

import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString
} from 'graphql';
import {
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
  globalIdField
} from 'graphql-relay';

import fields from 'schemas/fields';

const {nodeInterface} = fields;

const dataType = new GraphQLObjectType({
  name: 'Todo',
  description: 'This is the type of the Todo.',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('Todo'),
    note: {
      type: GraphQLString,
      description: 'This is the note of the Todo.'
    },
    status: {
      type: GraphQLString,
      description: 'This is the status of the Todo.'
    },
    tag: {
      type: GraphQLString,
      description: 'This is the tag of the Todo.'
    }
  }
});

const {connectionType: todoConnection} =
  connectionDefinitions({name: 'todo', nodeType: dataType});

export default dataType;
export const todoGroupType = new GraphQLObjectType({
  name: 'TodoGroup',
  description: 'This is the type of the Todo group.',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('TodoGroup'),
    todoGroup: {
      type: todoConnection,
      description: 'This is the group of the Todo.',
      args: {
        ...connectionArgs,
        status: {
          type: new GraphQLList(GraphQLString),
          description: 'Use to filter the todo with the status'
        }
      },
      resolve: (data, {status, ...args}) => {
        let output = data || [];

        if(status)
          output = [...output].filter(data => {
            return status.length === 0 || [...status].concat('').includes(data.status)
          });

        return connectionFromArray(output, args);
      }
    }
  }
});
