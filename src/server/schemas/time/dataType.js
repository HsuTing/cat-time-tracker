'use strict';

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
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
  name: 'Time',
  description: 'This is the type of the Time.',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField('Time'),
    todo_id: {
      type: GraphQLString,
      description: 'This is the todo id of the Time.'
    },
    tag: {
      type: GraphQLString,
      description: 'This is the tag of the Time.'
    },
    note: {
      type: GraphQLString,
      description: 'This is the note of the Time.'
    },
    start: {
      type: GraphQLString,
      description: 'This is the start time of the Time.'
    },
    end: {
      type: GraphQLString,
      description: 'This is the end time of the Time.'
    }
  })
});

const {connectionType: timeConnection} =
  connectionDefinitions({name: 'time', nodeType: dataType});

export default dataType;
export const timeGroupType = new GraphQLObjectType({
  name: 'TimeGroup',
  description: 'This is the type of the Time group.',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField('TimeGroup'),
    timeGroup: {
      type: timeConnection,
      description: 'This is the group of the Time.',
      args: {
        ...connectionArgs,
        tags: {
          type: new GraphQLList(GraphQLString),
          description: 'Use to filter the time with the tag.'
        },
        todo_ids: {
          type: new GraphQLList(GraphQLString),
          description: 'Use to filter the time with the todo id.'
        }
      },
      resolve: (data, {tags, todo_ids, ...args}) => {
        let output = data || [];

        if(tags)
          output = [...output].filter(({tag}) => tags.length === 0 || tags.includes(tag));

        if(todo_ids)
          output = [...output].filter(({todo_id}) => todo_ids.length === 0 || todo_ids.includes(todo_id));

        return connectionFromArray(output, args)
      }
    }
  })
});
