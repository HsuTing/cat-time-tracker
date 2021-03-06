'use strict';

import React from 'react';
import radium, {Style as StyleRadium} from 'radium';
import normalize from 'radium-normalize';

const all = {
  overflowScrolling: 'touch'
};

const a = {
  color: 'inherit',
  fontWeight: 'bold',
  textDecoration: 'initial'
};

@radium
export default class Normalize extends React.Component {
  render() {
    return (
      <style>
        <StyleRadium rules={normalize} />

        <StyleRadium scopeSelector='a*'
          rules={all}
        />

        <StyleRadium scopeSelector='a'
          rules={a}
        />
      </style>
    );
  }
}
