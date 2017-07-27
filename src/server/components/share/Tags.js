'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import * as style from './style/tag';

@radium
export default class Tags extends React.Component {
  static propTypes = {
    setting: PropTypes.object.isRequired,
    tag: PropTypes.string,
    children: PropTypes.element
  }

  constructor(props) {
    super(props);
    this.state = {
      colors: this.getColors(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props.setting) !== JSON.stringify(nextProps.setting))
      this.setState({colors: this.getColoc(nextProps)});
  }

  shouldComponentUpdate(nextProps) {
    return (
      JSON.stringify(this.props.setting) !== JSON.stringify(nextProps.setting) ||
      this.props.tag !== nextProps.tag
    );
  }

  render() {
    const {tag, children, ...props} = this.props;
    const {colors} = this.state;

    delete props.setting;
    delete props.relay;

    if(tag)
      return (
        <h2 {...props}
          style={[style.root, props.style]}
        >
          {children}

          <font style={style.background(colors[tag])}
          >{tag[0].toUpperCase() + tag.slice(1)}</font>
        </h2>
      );

    return (
      <div>
        {Object.keys(colors).map((name, index) => (
          <h2 key={index}
            {...props}
            style={[style.root, props.style]}
          >
            {children}

            <font style={style.background(colors[name])}
            >{name[0].toUpperCase() + name.slice(1)}</font>
          </h2>
        ))}
      </div>
    );
  }

  getColors({setting}) {
    const colors = {};

    setting.tags.tagsGroup.edges.forEach(({node}) => {
      const {name, color} = node;

      colors[name] = color;
    });

    return colors;
  }
}
