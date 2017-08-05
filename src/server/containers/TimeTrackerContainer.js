'use strict';

import React from 'react';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import Loading from 'cat-components/lib/loading';

import TimeTracker from 'componentsTimeTracker/TimeTracker';
import environment from 'utils/environment';

/* eslint-disable react/display-name */
export default (preProps) => (
  <QueryRenderer environment={environment}
    query={graphql.experimental`
      query TimeTrackerContainerQuery {
        todo {
          ...TodoNotDoneContainer_todo
        }
        setting {
          ...TagsContainer_setting
          ...TimeTrackerCustomContainer_setting
        }
      }
    `}
    render={({error, props}) => {
      if(error)
        return <div>{error.message}</div>;
      /* eslint-disable react/prop-types */
      else if(props)
        return (
          <TimeTracker {...preProps}
            data={props}
          />
        );
      /* eslint-enable react/prop-types */
      return <Loading />;
    }}
  />
);
/* eslint-enable react/display-name */
