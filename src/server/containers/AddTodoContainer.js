'use strict';

import {
  createFragmentContainer,
  graphql
} from 'react-relay';

import AddTodo from 'componentsModifyTodo/AddTodo';

export default createFragmentContainer(
  AddTodo, graphql`
    fragment AddTodoContainer_setting on Setting {
      tags {
        tagsGroup {
          edges {
            node {
              name
              color
            }
          }
        }
      }
    }
  `
);
