'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {
  commitMutation,
  graphql
} from 'react-relay';
import radium, {StyleRoot} from 'radium';
import {Redirect} from 'react-router-dom';
import moment from 'moment';
import Loading from 'cat-components/lib/loading';
import {inputConnect} from 'cat-components/lib/input-redux';
import timer from 'cat-components/lib/timer';

import Tags from 'containers/TagsContainer';
import environment from 'utils/environment';

import * as style from './style/timer';

const mutation = graphql`
  mutation TimerMutation(
    $input: TimeInput!
  ) {
    addTime(input: $input) {
      status
    }
  }
`;

@inputConnect('time-tracker')()
@timer()
@radium
export default class Timer extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    isRunning: PropTypes.bool.isRequired,
    timer: PropTypes.object.isRequired,
    timerStart: PropTypes.func.isRequired,
    timerReset: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      time: null
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  render() {
    const {data, form, isRunning, timer} = this.props;
    const {hours, minutes, seconds} = timer;
    const {id, tag, note} = form || {};

    if((id && !id.isError) &&
      (tag && !tag.isError) &&
      (note && !note.isError))
      return (
        <StyleRoot style={style.root}>
          <div />

          <div>
            <div style={style.timerRoot}
              onClick={!isRunning ? this.start : this.stop}
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

            <div style={style.content.root}>
              <Tags style={style.content.tag}
                setting={data.setting}
                tag={tag.value}
              />
              {note.value}
            </div>
          </div>

          <div />
        </StyleRoot>
      );

    return (
      <Redirect to='/time-tracker/' />
    );
  }

  start() {
    const {isRunning, timerStart} = this.props;

    if(isRunning)
      return;

    timerStart();
    this.setState({time: moment().format()});
  }

  stop() {
    const {form, isRunning, timerReset} = this.props;
    const {time} = this.state;
    const {id, tag, note} = form || {};

    if(!isRunning)
      return;

    const variables = {input: {
      id: id.value,
      tag: tag.value,
      note: note.value,
      start: time,
      end: moment().format()
    }};

    commitMutation(
      environment, {
        mutation,
        variables,
        onCompleted: response => {
          if(response.addTime.status) {
            timerReset();
            this.setState({time: null});
            return
          }

          alert('Server error');
        },
        onError: err => console.error(err)
      }
    );
  }
}
