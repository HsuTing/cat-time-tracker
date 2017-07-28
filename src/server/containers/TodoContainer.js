'use strict';

import {
  createFragmentContainer,
  graphql
} from 'react-relay';

import Todo from 'componentsShare/Todo';

export default createFragmentContainer(
  Todo, graphql`
    fragment TodoContainer_todo on TodoGroup {
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
  `
);
