'use strict';

import React from 'react';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import Loading from 'cat-components/lib/loading';

import ModifyTodo from 'componentsModifyTodo/ModifyTodo';
import environment from 'utils/environment';

/* eslint-disable react/display-name */
export default () => (
  <QueryRenderer environment={environment}
    query={graphql.experimental`
      query ModifyTodoContainerQuery {
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
        setting {
          ...TagsContainer_setting
          ...AddTodoContainer_setting
        }
      }
    `}
    render={({error, props}) => {
      if(error)
        return <div>{error.message}</div>;
      /* eslint-disable react/prop-types */
      else if(props)
        return (
          <ModifyTodo todo={props.todo.todoGroup.edges.map(({node}) => node)}
            data={props}
          />
        );
      /* eslint-enable react/prop-types */
      return <Loading />;
    }}
  />
);
/* eslint-enable react/display-name */
