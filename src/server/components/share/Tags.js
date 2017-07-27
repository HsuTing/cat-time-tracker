'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import Toggle from 'cat-components/lib/toggle';

import * as style from './style/tag';

@radium
export default class Tags extends React.Component {
  static propTypes = {
    setting: PropTypes.object.isRequired,
    tag: PropTypes.string,
    chooseTags: PropTypes.array,
    modifyChooseTags: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      colors: this.getColors(props)
    };

    this.modifyChooseTags = this.modifyChooseTags.bind(this);
  }

  componentDidMount() {
    const {tag, modifyChooseTags} = this.props;
    const {colors} = this.state;

    if(!tag)
      modifyChooseTags(Object.keys(colors));
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props.setting) !== JSON.stringify(nextProps.setting))
      this.setState({colors: this.getColors(nextProps)});
  }

  shouldComponentUpdate(nextProps) {
    return (
      JSON.stringify(this.props.setting) !== JSON.stringify(nextProps.setting) ||
      JSON.stringify(this.props.chooseTags) !== JSON.stringify(nextProps.chooseTags) ||
      this.props.tag !== nextProps.tag
    );
  }

  render() {
    const {tag, chooseTags, ...props} = this.props;
    const {colors} = this.state;

    delete props.setting;
    delete props.relay;
    delete props.modifyChooseTags;

    if(tag)
      return (
        <h2 {...props}
          style={[style.root, props.style]}
        >
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
            onClick={this.modifyChooseTags(name)}
          >
            <Toggle rootStyle={() => style.toggle}
              clicked={chooseTags.includes(name)}
              checked
            />

            <font style={style.background(colors[name])}
            >{name[0].toUpperCase() + name.slice(1)}</font>
          </h2>
        ))}
      </div>
    );
  }

  modifyChooseTags(tag) {
    return () => {
      const {modifyChooseTags, chooseTags} = this.props;

      if(chooseTags.includes(tag))
        modifyChooseTags([...chooseTags].filter(oldtag => oldtag !== tag));
      else
        modifyChooseTags([...chooseTags].concat([tag]));
    };
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
