'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium, {StyleRoot} from 'radium';
import Loading from 'cat-components/lib/loading';
import timer from 'cat-components/lib/timer';

import * as style from './style/timer';

@radium
@timer()
export default class Timer extends React.Component {
  static propTypes = {
    isRunning: PropTypes.bool.isRequired,
    timer: PropTypes.object.isRequired,
    timerStart: PropTypes.func.isRequired,
    timerReset: PropTypes.func.isRequired
  }

  render() {
    const {
      isRunning,
      timer,
      timerStart,
      timerReset
    } = this.props;
    const {hours, minutes, seconds} = timer;

    return (
      <StyleRoot>
        <div style={style.root}
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
      </StyleRoot>
    );
  }
}
