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

  shouldComponentUpdate() {
    return false;
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
export default ({radiumConfig, router, ...props}) => (
  <Wrapper radiumConfig={radiumConfig}
    router={router}
    modules={{reactRouterDom: require('react-router-dom')}}
  >
    <Index {...props} />
  </Wrapper>
);
/* eslint-enable react/display-name, react/prop-types */
