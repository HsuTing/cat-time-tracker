'use strict';

import {
  commitMutation,
  graphql
} from 'react-relay';

import environment from 'utils/environment';

const mutation = graphql`
  mutation toggleTodoMutation(
    $input: ToggleTodoInput!
  ) {
    toggleTodo(input: $input) {
      todo {
        id
        status
      }
    }
  }
`;

export default (input, todo) => {
  const payload = todo.filter(({id}, index) => {
    return id === input.id;
  })[0];

  const optimisticResponse = {
    toggleTodo: {
      todo: {
        ...payload,
        status: payload.status === 'done' ? 'not done' : 'done'
      }
    }
  };

  commitMutation(
    environment, {
      mutation,
      variables: {
        input
      },
      optimisticResponse,
      onCompleted: response => {
        console.log(response.toggleTodo.todo);
      },
      onError: err => console.error(err)
    }
  );
};
