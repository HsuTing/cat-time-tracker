'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {
  commitMutation,
  graphql
} from 'react-relay';
import radium from 'radium';
import Toggle from 'cat-components/lib/toggle';

import Tags from 'containers/TagsContainer';
import environment from 'utils/environment';

import * as style from './style/modifyTodo';

const mutation = graphql`
  mutation ModifyTodoMutation(
    $input: ToggleTodoInput!
  ) {
    toggleTodo(input: $input) {
      todo {
        id
        tag
        note
        status
      }
    }
  }
`;

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
    const variables = {input: {
      id
    }};

    commitMutation(
      environment, {
        mutation,
        variables,
        onCompleted: response => {
          console.log(response.toggleTodo.todo);
        },
        onError: err => console.error(err)
      }
    );
  }
}
