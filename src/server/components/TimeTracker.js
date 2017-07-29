'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium, {StyleRoot} from 'radium';
import Input, {inputConnect} from 'cat-components/lib/input-redux';
import Loading from 'cat-components/lib/loading';
import timer from 'cat-components/lib/timer';

import * as style from './style/timeTracker';

@radium
@inputConnect('timer')()
@timer()
export default class TimeTracker extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    inputDispatch: PropTypes.func.isRequired,
    isRunning: PropTypes.bool.isRequired,
    timer: PropTypes.object.isRequired,
    timerStart: PropTypes.func.isRequired,
    timerReset: PropTypes.func.isRequired
  }

  render() {
    const {
      form,
      inputDispatch,
      isRunning,
      timer,
      timerStart,
      timerReset
    } = this.props;
    const {hours, minutes, seconds} = timer;
    const {value, isError, error} = form.note || {};
    console.log(value, isError, error);

    return (
      <StyleRoot style={style.root}>
        <div />

        <div>
          <Input style={{}}
            type='textarea'
            rules={[{
              validator: 'isEmpty',
              message: 'Can not be empty'
            }]}
            value={value === undefined ? '' : value}
            onChange={data => inputDispatch('note', data)}
          />

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
        </div>

        <div />
      </StyleRoot>
    );
  }
}
