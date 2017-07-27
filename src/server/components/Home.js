'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import moment from 'moment';
import Timeline from 'cat-components/lib/timeline';

import Tag from 'componentsShare/Tag';
import {getTime} from 'utils/time';

import * as style from './style/home';

@radium
export default class Home extends React.Component {
  static propTypes = {
    time: PropTypes.arrayOf(PropTypes.shape({
      tag: PropTypes.string.isRequired,
      note: PropTypes.string.isRequired,
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired
    })).isRequired,
    format: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      time: this.timelineData(props)
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props.time) !== JSON.stringify(nextProps.time) ||
      this.props.format !== nextProps.format)
      this.setState({time: this.timelineData(nextProps)});
  }

  shouldComponentUpdate(nextProps) {
    return (
      JSON.stringify(this.props.time) !== JSON.stringify(nextProps.time) ||
      this.props.format !== nextProps.format
    );
  }

  render() {
    const {time} = this.state;

    return (
      <div>
        <Timeline time={time} />
      </div>
    );
  }

  timelineData({time, format, data}) {
    return time.map(({tag, note, start, end}) => {
      const startTime = moment(start);
      const endTime = moment(end);
      const {hours, minutes, seconds} = getTime(startTime, endTime);

      return {
        date: moment(start).format(format),
        content: (
          <div>
            <Tag tag={tag}
              tags={data.setting}
            />

            <p style={style.content.note}
            >{note}</p>

            {[{
              title: 'start',
              time: startTime.format(format)
            }, {
              title: 'end',
              time: endTime.format(format)
            }, {
              title: 'total',
              time: `${hours} hr ${minutes} min ${seconds} sec`
            }].map(({title, time}, timeIndex) => (
              <p key={timeIndex}
                style={style.content.time}
              >
                <font style={style.content.title}>{title}</font>

                {time}
              </p>
            ))}
          </div>
        )
      };
    });
  }
}
