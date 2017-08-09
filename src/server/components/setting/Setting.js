'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import Input, {inputConnect} from 'cat-components/lib/input-redux';

import InputSelect from 'componentsShare/InputSelect';
import fields from 'fields/setting';
import {
  inputTitle as inputTitleStyle,
  input as inputStyle,
  inputError as inputErrorStyle
} from 'componentsShare/style/style';

import * as style from './style/setting';

@inputConnect('setting')()
@radium
export default class Setting extends React.Component {
  static propTypes = {
    format: PropTypes.string.isRequired,
    timerColor: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    inputDispatch: PropTypes.func.isRequired
  }

  render() {
    const {form, inputDispatch, ...props} = this.props;

    return (
      <div>
        {fields.map(({title, name, rules, type}, index) => {
          const {value, isError, error} = form[name] || {};

          return (
            <div key={index}
              style={style.item}
            >
              <h1 style={inputTitleStyle}>{title}</h1>

              {(() => {
                switch(type) {
                  case 'select':
                    return (
                      <InputSelect value={value === 'custom' ? '' : (value || '')}
                        placeholder='Choose a tag'
                        onChange={data => inputDispatch(name, data)}
                        rules={rules}
                        options={[]}
                      />
                    );

                  default:
                    return (
                      <Input style={inputStyle}
                        value={value === undefined ? props[name] : value}
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
                  <p style={inputErrorStyle}
                  >{error.join(', ')}</p>
              }
            </div>
          );
        })}
      </div>
    );
  }
}
