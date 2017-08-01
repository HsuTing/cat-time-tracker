'use strict';

import getRules from './getRules';

export default [{
  name: 'id',
  rules: getRules([
    'isEmpty'
  ])
}, {
  name: 'tag',
  title: 'Tag',
  rules: getRules([
    'isEmpty'
  ]),
  type: 'select'
}, {
  name: 'note',
  title: 'Note',
  rules: getRules([
    'isEmpty'
  ]),
  type: 'textarea'
}];
