'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import moment from 'moment';
import CatTimeline from 'cat-components/lib/timeline';
import * as grey from 'cat-components/lib/color/grey';

import Tags from 'containers/TagsContainer';
import {getTime} from 'utils/time';

import * as style from './style/timeline';

@radium
export default class TimeLine extends React.Component {
  static propTypes = {
    time: PropTypes.object.isRequired,
    format: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    chooseTags: PropTypes.array.isRequired,
    modifyChooseTags: PropTypes.func.isRequired,
    relay: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.filterTime = this.filterTime.bind(this);
    this.timelineData = this.timelineData.bind(this);
    this.state = {
      time: this.timelineData(props)
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props.time) !== JSON.stringify(nextProps.time) ||
      JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data) ||
      this.props.format !== nextProps.format)
      this.setState({time: this.timelineData(nextProps)});

    if(JSON.stringify(this.props.chooseTags) !== JSON.stringify(nextProps.chooseTags))
      this.props.relay.refetch({
        tags: nextProps.chooseTags
      }, null);
  }

  shouldComponentUpdate(nextProps) {
    return (
      JSON.stringify(this.props.time) !== JSON.stringify(nextProps.time) ||
      JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data) ||
      JSON.stringify(this.props.chooseTags) !== JSON.stringify(nextProps.chooseTags) ||
      this.props.format !== nextProps.format
    );
  }

  render() {
    const {time} = this.state;

    return (
      <CatTimeline time={time}
        color={grey._200_}
      />
    );
  }

  filterTime(tag) {
    const {relay, modifyChooseTags} = this.props;

    return () => {
      relay.refetch({
        tags: [tag]
      }, null);
      modifyChooseTags([tag]);
    };
  }

  timelineData({time, format, data}) {
    return time.timeGroup.edges.map(({node}) => {
      const {tag, note, start, end} = node;
      const startTime = moment(start);
      const endTime = moment(end);
      const {hours, minutes, seconds} = getTime(startTime, endTime);

      return {
        date: moment(start).format(format),
        content: (
          <div>
            <Tags tag={tag}
              setting={data.setting}
              onClick={this.filterTime(tag)}
            />

            <p style={style.note}
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
                style={style.time}
              >
                <font style={style.title}>{title}</font>

                {time}
              </p>
            ))}
          </div>
        )
      };
    });
  }
}
