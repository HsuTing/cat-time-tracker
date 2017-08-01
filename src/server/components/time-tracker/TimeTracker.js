'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import {Route, Switch, withRouter} from 'react-router-dom';

@withRouter
@radium
export default class TimeTracker extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    pages: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return (
      JSON.stringify(this.props.location) !== JSON.stringify(nextProps.location)
    );
  }

  render() {
    const {pages, data} = this.props;

    return (
      <Switch>
        {pages.map(({path, Component}, index) => (
          <Route key={index}
            path={`/time-tracker${path}`}
            exact
            component={() => (
              <Component {...data}
                data={data}
              />
            )}
          />
        ))}
      </Switch>
    );
  }
}
