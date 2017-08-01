'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {inputConnect} from 'cat-components/lib/input-redux';

@withRouter
@inputConnect('time-tracker')()
@radium
export default class TimeTracker extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    pages: PropTypes.array.isRequired,
    form: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return (
      JSON.stringify(this.props.location) !== JSON.stringify(nextProps.location)
    );
  }

  render() {
    const {pages, form, data, location} = this.props;
    const {note, tag} = form || {};

    if(location.pathname !== '/time-tracker/' && !(
      note && !note.isError &&
      tag && !tag.isError
    ))
      return (
        <Redirect to='/time-tracker/' />
      );

    return (
      <Switch>
        {pages.map(({path, Component}, index) => (
          <Route key={index}
            path={`/time-tracker${path}`}
            exact
            component={() => (
              <Component data={data} />
            )}
          />
        ))}
      </Switch>
    );
  }
}
