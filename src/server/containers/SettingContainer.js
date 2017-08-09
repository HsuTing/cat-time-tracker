'use strict';

import React from 'react';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import Loading from 'cat-components/lib/loading';

import Setting from 'componentsSetting/Setting';
import environment from 'utils/environment';

/* eslint-disable react/display-name */
export default () => (
  <QueryRenderer environment={environment}
    query={graphql.experimental`
      query SettingContainerQuery {
        setting {
          format
          timerColor
        }
      }
    `}
    render={({error, props}) => {
      if(error)
        return <div>{error.message}</div>;
      /* eslint-disable react/prop-types */
      else if(props) {
        const {setting} = props;

        return (
          <Setting {...setting} />
        );
      }
      /* eslint-enable react/prop-types */
      return <Loading />;
    }}
  />
);
/* eslint-enable react/display-name */
