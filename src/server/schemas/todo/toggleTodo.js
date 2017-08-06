'use strict';

import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';
import {
  mutationWithClientMutationId,
  fromGlobalId
} from 'graphql-relay';

import {
  todoById as getTodoById
} from 'db/get';
import {
  toggleTodo as setToggleTodo
} from 'db/set';

import dataType from './dataType';

export default mutationWithClientMutationId({
  name: 'ToggleTodo',
  description: 'Toggle the Todo.',
  inputFields: {
    id: {
      description: 'This is the id of the Todo.',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  outputFields: {
    todo: {
      description: 'This is output data of the Todo after modifying the Todo.',
      type: dataType
    }
  },
  mutateAndGetPayload: async ({id}, {name}) => {
    const reallyID = fromGlobalId(id).id;
    const todo = await getTodoById({name}, reallyID);
    const newStatus = todo.status === 'done' ? 'not done' : 'done';

    if(todo.id && await setToggleTodo(name, {id: reallyID, status: newStatus}))
      return {
        todo: {
          ...todo,
          status: newStatus
        }
      };

    return {};
  }
});
