'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import radium from 'radium';

import * as style from './style/tag';

@radium
class Tag extends React.Component {
  static propTypes = {
    tags: PropTypes.object.isRequired,
    tag: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      color: this.getColor(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props.tags) !== JSON.stringify(nextProps.tags) ||
      this.props.tag !== nextProps.tag)
      this.setState({color: this.getColoc(nextProps)});
  }

  shouldComponentUpdate(nextProps) {
    return (
      JSON.stringify(this.props.tags) !== JSON.stringify(nextProps.tags) ||
      this.props.tag !== nextProps.tag
    );
  }

  render() {
    const {tag} = this.props;
    const {color} = this.state;
    const title = tag[0].toUpperCase() + tag.slice(1);

    return (
      <h2 style={style.root}>
        <font style={style.background(color)}
        >{title}</font>
      </h2>
    );
  }

  getColor({tags, tag}) {
    const tagsColor = {};

    tags.tags.tagsGroup.edges.forEach(({node}) => {
      const {name, color} = node;

      tagsColor[name] = color;
    });

    return tagsColor[tag];
  }
}

export default createFragmentContainer(
  Tag, graphql`
    fragment Tags_tags on Setting {
      tags {
        tagsGroup {
          edges {
            node {
              name
              color
            }
          }
        }
      }
    }
  `
);
