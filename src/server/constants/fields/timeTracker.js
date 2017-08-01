'use strict';

import getRules from './getRules';

export default [{
  name: 'id',
  rules: getRules([
    'isEmpty'
  ])
}, {
  name: 'note',
  rules: getRules([
    'isEmpty'
  ])
}, {
  name: 'tag',
  rules: getRules([
    'isEmpty'
  ])
}];
