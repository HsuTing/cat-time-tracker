'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import moment from 'moment';
import Timeline from 'cat-components/lib/timeline';
import Toggle from 'cat-components/lib/toggle';
import * as grey from 'cat-components/lib/color/grey';

import Tags from 'componentsShare/Tags';
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
    const {data} = this.props;
    const {time} = this.state;

    return (
      <div>
        <div style={style.grid}>
          <div style={style.col}>
            <Tags style={style.tags}
              setting={data.setting}
            >
              <Toggle rootStyle={() => style.toggle}
                checked
              />
            </Tags>
          </div>

          <div style={style.col}>
            todo
          </div>
        </div>

        <div style={style.timeline.root}>
          <Timeline time={time}
            color={grey._200_}
          />
        </div>
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
            <Tags tag={tag}
              setting={data.setting}
            />

            <p style={style.timeline.note}
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
                style={style.timeline.time}
              >
                <font style={style.timeline.title}>{title}</font>

                {time}
              </p>
            ))}
          </div>
        )
      };
    });
  }
}
