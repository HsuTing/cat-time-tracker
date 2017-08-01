'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium, {StyleRoot} from 'radium';
import {Route, Switch} from 'react-router-dom';

import * as style from './style/timeTracker';

@radium
export default class TimeTracker extends React.Component {
  static propTypes = {
    pages: PropTypes.array.isRequired
  }

  render() {
    const {pages} = this.props;

    return (
      <StyleRoot style={style.root}>
        <div />

        <Switch>
          {pages.map(({path, Component}, index) => (
            <Route key={index}
              path={`/time-tracker${path}`}
              exact
              component={() => (
                <Component />
              )}
            />
          ))}
        </Switch>

        <div />
      </StyleRoot>
    );
  }
}
