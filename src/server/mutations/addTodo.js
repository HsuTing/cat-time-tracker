'use strict';

import {
  commitMutation,
  graphql
} from 'react-relay';

import environment from 'utils/environment';

const mutation = graphql`
  mutation addTodoMutation(
    $input: AddTodoInput!
  ) {
    addTodo(input: $input) {
      todo {
        todoGroup {
          edges {
            node {
              id
              tag
              note
              status
            }
          }
        }
      }
    }
  }
`;

export default (input) => {
  const configs = [{
    type: 'RANGE_ADD',
    parentID: 'todo',
    connectionInfo: [{
      rangeBehavior: 'append',
    }],
    edgeName: 'edges',
  }];

  commitMutation(
    environment, {
      mutation,
      variables: {
        input
      },
      configs,
      onCompleted: response => {
        if(response.addTodo)
          return;

        alert('Server error');
      },
      onError: err => console.error(err)
    }
  );
};
