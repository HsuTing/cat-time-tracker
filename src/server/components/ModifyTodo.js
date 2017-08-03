'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import Toggle from 'cat-components/lib/toggle';

import Tags from 'containers/TagsContainer';

import * as style from './style/modifyTodo';

@radium
export default class ModifyTodo extends React.Component {
  static propTypes = {
    todo: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        note: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        tag: PropTypes.string.isRequired
      })
    ).isRequired,
    data: PropTypes.object.isRequired
  }

  render() {
    const {todo, data} = this.props;

    return (
      <div>
        {todo.slice(1).map(({id, note, status, tag}, index) => (
          <div key={index}
            style={style.root}
          >
            <Toggle type='switch'
              checked={status === 'done'}
            />

            <Tags tag={tag}
              setting={data.setting}
              style={style.tag}
            />

            <div style={style.note}
            >{note}</div>
          </div>
        ))}
      </div>
    );
  }
}
