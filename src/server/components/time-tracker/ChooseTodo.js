'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import Link from 'cat-components/lib/link';
import Button from 'cat-components/lib/button';
import {inputConnect, inputCheck} from 'cat-components/lib/input-redux';

import TodoContainer from 'containers/TodoNotDoneContainer';
import fields from 'fields/timeTracker';

import * as style from './style/chooseTodo';

@inputConnect('time-tracker')()
@radium
export default class ChooseTodo extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    inputDispatch: PropTypes.func.isRequired,
    submitDispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      todo: {}
    };

    this.nextPage = this.nextPage.bind(this);
    this.modifyChooseTodo = this.modifyChooseTodo.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      JSON.stringify(this.props.form) !== JSON.stringify(nextProps.form) ||
      JSON.stringify(this.state.todo) !== JSON.stringify(nextState.todo)
    );
  }

  render() {
    const {form, data} = this.props;
    const {id, tag} = form || {};
    let nextPage = '/timer/';
    if((tag && tag.value === 'custom') ||
      id && id.value && tag && tag.value === ''
    )
      nextPage = '/custom/';

    return (
      <div>
        <TodoContainer todo={data.todo}
          data={data}
          modifyChooseTodo={this.modifyChooseTodo}
          getTodo={data => (this.todoList = data)}
          {...(id ? {todoId: id.value} : {})}
        />

        <div style={style.buttonRoot}>
          <Link to={`/time-tracker${nextPage}`}>
            <Button onClick={this.nextPage}>next</Button>
          </Link>
        </div>
      </div>
    );
  }

  nextPage() {
    const {form, submitDispatch} = this.props;
    const {tag} = form || {};

    if(tag && tag.value === 'custom')
      return;

    submitDispatch(() => {});
  }

  modifyChooseTodo(todo) {
    const {inputDispatch} = this.props;
    const chooseTodo = (
      todo.length === 0 ?
        {} :
        this.todoList.filter(({id}) => id === todo[0])[0]
    );

    fields.forEach(({name, rules}) => {
      inputDispatch(
        name,
        inputCheck({
          ...chooseTodo,
          tag: chooseTodo.tag === '' ? 'custom' : chooseTodo.tag
        }[name] || '', rules)
      );
    });

    this.setState({todo: chooseTodo});
  }
}
