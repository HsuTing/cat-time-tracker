'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import Tags from 'containers/TagsContainer';
import Timeline from 'containers/TimelineContainer';

import * as style from './style/home';

@radium
export default class Home extends React.Component {
  static propTypes = {
    format: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      chooseTags: []
    };
    this.modifyChooseTags = this.modifyChooseTags.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data) ||
      JSON.stringify(this.state.chooseTags) !== JSON.stringify(nextState.chooseTags) ||
      this.props.format !== nextProps.format
    );
  }

  render() {
    const {format, data} = this.props;
    const {chooseTags} = this.state;

    return (
      <div>
        <div style={style.grid}>
          <div style={style.col}>
            <Tags style={style.tags}
              setting={data.setting}
              chooseTags={chooseTags}
              modifyChooseTags={this.modifyChooseTags}
            />
          </div>

          <div style={style.col}>
            todo
          </div>
        </div>

        <div style={style.timeline}>
          <Timeline time={data.time}
            format={format}
            data={data}
            chooseTags={chooseTags}
            modifyChooseTags={this.modifyChooseTags}
          />
        </div>
      </div>
    );
  }

  modifyChooseTags(tags) {
    this.setState({chooseTags: tags});
  }
}
