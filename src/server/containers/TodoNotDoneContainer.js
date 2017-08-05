'use strict';

import {
  createFragmentContainer,
  graphql
} from 'react-relay';

import Todo from 'componentsShare/Todo';

export default createFragmentContainer(
  Todo, graphql`
    fragment TodoNotDoneContainer_todo on TodoGroup {
      todoGroup(status: ["not done"]) {
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
  `
);
