'use strict';

import React from 'react';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import Loading from 'cat-components/lib/loading';

import Home from 'components/Home';
import environment from 'utils/environment';

/* eslint-disable react/display-name */
export default () => (
  <QueryRenderer environment={environment}
    query={graphql.experimental`
      query HomeContainerQuery($tags: [String] $todo_ids: [String]) {
        time {
          ...TimelineContainer_time @arguments(tags: $tags todo_ids: $todo_ids)
        }
        todo {
          ...TodoContainer_todo
        }
        setting {
          ...TagsContainer_setting
          format
        }
      }
    `}
    variables={{
      tags: [],
      todo_ids: []
    }}
    render={({error, props}) => {
      if(error)
        return <div>{error.message}</div>;
      /* eslint-disable react/prop-types */
      else if(props) {
        const {setting} = props;

        return (
          <Home format={setting.format}
            data={props}
          />
        );
      }
      /* eslint-enable react/prop-types */
      return <Loading />;
    }}
  />
);
/* eslint-enable react/display-name */
