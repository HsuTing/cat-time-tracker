'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import Wrapper from 'cat-components/lib/wrapper';

import Normalize from 'componentsShare/Normalize';

import Dashboard from './Dashboard';

@radium
class Index extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render() {
    return (
      <div>
        <Normalize />

        <Dashboard {...this.props.data} />
      </div>
    );
  }
}

/* eslint-disable react/display-name, react/prop-types */
export default ({radiumConfig, redux, router, ...props}) => (
  <Wrapper radiumConfig={radiumConfig}
    redux={redux}
    router={router}
    modules={{
      redux: require('redux'),
      reactRedux: require('react-redux'),
      reactRouterDom: require('react-router-dom')
    }}
  >
    <Index {...props} />
  </Wrapper>
);
/* eslint-enable react/display-name, react/prop-types */
