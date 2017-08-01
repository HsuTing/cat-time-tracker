'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium, {StyleRoot} from 'radium';
import {Redirect} from 'react-router-dom';
import Loading from 'cat-components/lib/loading';
import {inputConnect} from 'cat-components/lib/input-redux';
import timer from 'cat-components/lib/timer';

import * as style from './style/timer';

@inputConnect('time-tracker')()
@timer()
@radium
export default class Timer extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    isRunning: PropTypes.bool.isRequired,
    timer: PropTypes.object.isRequired,
    timerStart: PropTypes.func.isRequired,
    timerReset: PropTypes.func.isRequired
  }

  render() {
    const {
      form,
      isRunning,
      timer,
      timerStart,
      timerReset
    } = this.props;
    const {hours, minutes, seconds} = timer;
    const {id, tag, note} = form || {};

    if((id && !id.isError) &&
      (tag && !tag.isError) &&
      (note && !note.isError))
      return (
        <StyleRoot style={style.root}>
          <div />

          <div style={style.timerRoot}
            onClick={() => !isRunning ? timerStart() : timerReset()}
          >
            <div style={style.circle} />

            {
              !isRunning ?
                null :
                <Loading innerRadius={105}
                  outerRadius={110}
                />
            }

            <div style={style.timer(isRunning)}>
              {`${hours} hr ${minutes} min ${seconds} sec`}
            </div>
          </div>

          <div />
        </StyleRoot>
      );

    return (
      <Redirect to='/time-tracker/' />
    );
  }
}
