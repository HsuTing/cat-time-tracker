'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import RelayTypes from 'cat-graphql';
import Toggle from 'cat-components/lib/toggle';

import Tags from 'containers/TagsContainer';

import * as style from './style/todo';

@radium
export default class Todo extends React.Component {
  static propTypes = {
    todo: PropTypes.shape({
      todoGroup: RelayTypes({
        id: PropTypes.string.isRequired,
        note: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        tag: PropTypes.string.isRequired
      })
    }).isRequired,
    data: PropTypes.object.isRequired,
    modifyChooseTodo: PropTypes.func.isRequired,
    getTodo: PropTypes.func,
    todoId: PropTypes.string
  }

  static defaultProps = {
    getTodo: () => {}
  }

  constructor(props) {
    super(props);
    this.state = {
      chooseId: props.todoId ? props.todoId : null,
      chooseTag: []
    };

    this.chooseTodo = this.chooseTodo.bind(this);
  }

  componentDidMount() {
    const {getTodo, todo} = this.props;

    getTodo(todo.todoGroup.edges.map(({node}) => node));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      JSON.stringify(this.props.todo) !== JSON.stringify(nextProps.todo) ||
      JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data) ||
      this.state.chooseId !== nextState.chooseId
    );
  }

  componentDidUpdate() {
    const {modifyChooseTodo} = this.props;
    const {chooseId, chooseTag} = this.state;

    modifyChooseTodo(chooseId ? [chooseId] : [], chooseTag);
  }

  render() {
    const {todo, data} = this.props;
    const {chooseId} = this.state;

    return (
      <div>
        <h1 style={style.title}>Todo</h1>

        {todo.todoGroup.edges.map(({node}, index) => {
          const {id, note, status, tag} = node;

          return (
            <div key={index}
              style={style.root(index === todo.todoGroup.edges.length - 1)}
            >
              <Toggle rootStyle={() => style.toggle}
                type='radio'
                clicked={chooseId === id}
                onClick={this.chooseTodo(id, tag)}
              />

              <div>
                {
                  status === '' ?
                    null :
                    <div style={style.status}
                    >{`( ${status} )`}</div>
                }

                {
                  tag === '' ?
                    null :
                    <Tags style={style.tag}
                      tag={tag}
                      setting={data.setting}
                    />
                }

                <div style={style.note}
                >{note}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  chooseTodo(id, tag) {
    return () => {
      const {chooseId} = this.state;

      this.setState({
        chooseId: chooseId === id ? null : id,
        chooseTag: chooseId === id || tag === '' ? [] : [tag]
      });
    };
  }
}
