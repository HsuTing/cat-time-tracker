'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import {Redirect} from 'react-router-dom';
import RelayTypes from 'cat-graphql';
import Input, {inputConnect} from 'cat-components/lib/input-redux';
import Button from 'cat-components/lib/button';

import InputSelect from 'componentsShare/InputSelect';
import fields from 'fields/timeTracker';
import {input as inputStyle} from 'componentsShare/style/style';

import * as style from './style/custom';

@inputConnect('time-tracker')()
@radium
export default class Custom extends React.Component {
  static propTypes = {
    setting: PropTypes.shape({
      tags: PropTypes.shape({
        tagsGroup: RelayTypes({
          name: PropTypes.string.isRequired,
          color: PropTypes.string.isRequired
        })
      }).isRequired
    }).isRequired,
    form: PropTypes.object.isRequired,
    inputDispatch: PropTypes.func.isRequired,
    submitDispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };

    this.submit = this.submit.bind(this);
  }

  render() {
    const {setting, form, inputDispatch, submitDispatch} = this.props;
    const {redirect} = this.state;
    const {id} = form || {};

    if(redirect)
      return (
        <Redirect to='/time-tracker/timer/' />
      );

    if(id)
      return (
        <div>
          {fields.slice(1).map(({title, name, rules, type}, index) => {
            const {value, isError, error} = form[name] || {};

            return (
              <div key={index}
                style={style.root}
              >
                <h1 style={style.title}
                >{title}</h1>

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
                    <p style={style.error}>{error.join(', ')}</p>
                }
              </div>
            );
          })}

          <Button style={style.button}
            onClick={() => submitDispatch(this.submit)}
          >next</Button>
        </div>
      );

    return (
      <Redirect to='/time-tracker/' />
    );
  }

  submit(data) {
    const isError = Object.keys(data).reduce((checkError, key) => {
      return checkError || data[key].isError;
    }, false);

    this.setState({redirect: !isError});
  }
}
