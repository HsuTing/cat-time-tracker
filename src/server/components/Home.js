'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import Toggle from 'cat-components/lib/toggle';

import Tags from 'containers/TagsContainer';
import Timeline from 'containers/TimelineContainer';

import * as style from './style/home';

@radium
export default class Home extends React.Component {
  static propTypes = {
    format: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return (
      JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data) ||
      this.props.format !== nextProps.format
    );
  }

  render() {
    const {format, data} = this.props;

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

        <div style={style.timeline}>
          <Timeline time={data.time}
            format={format}
            data={data}
          />
        </div>
      </div>
    );
  }
}
