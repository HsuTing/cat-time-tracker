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
    query={graphql`
      query HomeContainerQuery {
        time {
          timeGroup {
            edges {
              node {
                tag
                note
                start
                end
              }
            }
          }
        }
        setting {
          ...Tags_setting
          format
        }
      }
    `}
    render={({error, props}) => {
      if(error)
        return <div>{error.message}</div>;
      /* eslint-disable react/prop-types */
      else if(props) {
        const {time, setting} = props;

        return (
          <Home time={time.timeGroup.edges.map(({node}) => node)}
            format={setting.format}
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
