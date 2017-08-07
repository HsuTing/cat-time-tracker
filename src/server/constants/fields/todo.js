'use strict';

import getRules from './getRules';

export default [{
  name: 'tag',
  rules: getRules([
    'isEmpty'
  ]),
  title: 'Tag',
  type: 'select'
}, {
  name: 'note',
  rules: getRules([
    'isEmpty'
  ]),
  title: 'Note'
}];
