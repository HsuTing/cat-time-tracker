'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import Input, {inputConnect} from 'cat-components/lib/input-redux';
import Button from 'cat-components/lib/button';

import InputSelect from 'componentsShare/InputSelect';
import fields from 'fields/todo';
import {input as inputStyle} from 'componentsShare/style/style';
import addTodo from 'mutations/addTodo';

import * as style from './style/addTodo';

@inputConnect('add-todo')()
@radium
export default class AddTodo extends React.Component {
  static propTypes = {
    setting: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    inputDispatch: PropTypes.func.isRequired,
    submitDispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.addTodo = this.addTodo.bind(this);
  }

  render() {
    const {setting, form, inputDispatch, submitDispatch} = this.props;

    return (
      <div>
        {fields.map(({title, name, rules, type}, index) => {
          const {value, isError, error} = form[name] || {};

          return (
            <div key={index}
              style={style.item}
            >
              <h1 style={style.title}>{title}</h1>

              {(() => {
                switch(type) {
                  case 'select':
                    return (
                      <InputSelect value={value === 'custom' ? '' : (value || '')}
                        placeholder='Choose a tag'
                        onChange={data => inputDispatch(name, data)}
                        rules={rules}
                        options={setting.tags.tagsGroup.edges.map(({node}) => node.name)}
                      />
                    );

                  default:
                    return (
                      <Input style={inputStyle}
                        value={value === undefined ? '' : value}
                        onChange={data => inputDispatch(name, data)}
                        rules={rules}
                        type={type || 'text'}
                      />
                    );
                }
              })()}

              {
                !isError ?
                  null :
                  <p style={style.error}
                  >{error.join(', ')}</p>
              }
            </div>
          );
        })}

        <Button style={style.button}
          onClick={() => submitDispatch(this.addTodo)}
        >Add new todo</Button>

        <div style={style.bar}>
          {[].constructor.apply(this, new Array(3)).map((data, index) => (
            <div key={index}
              style={style.circle}
            />
          ))}
        </div>
      </div>
    );
  }

  addTodo(data) {
    const check = Object.keys(data).reduce((nowCheck, key) => {
      return nowCheck || data[key].isError;
    }, false);

    if(!check)
      addTodo({
        tag: data.tag.value,
        note: data.note.value
      });
  }
}
