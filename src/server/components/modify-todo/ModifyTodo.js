'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import Toggle from 'cat-components/lib/toggle';

import Tags from 'containers/TagsContainer';
import AddTodo from 'containers/AddTodoContainer';
import toggleTodo from 'mutations/toggleTodo';

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

  constructor(props) {
    super(props);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  render() {
    const {todo, data} = this.props;

    return (
      <div>
        <AddTodo setting={data.setting} />

        {todo.slice(1).map(({id, note, status, tag}, index) => (
          <div key={index}
            style={style.root}
          >
            <Toggle type='switch'
              onClick={() => this.toggleTodo(id)}
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

  toggleTodo(id) {
    const {todo} = this.props;

    toggleTodo({
      id
    }, todo);
  }
}
