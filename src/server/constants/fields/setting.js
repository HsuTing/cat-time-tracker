'use strict';

import getRules from './getRules';

export default [{
  name: 'format',
  rules: getRules([
    'isEmpty'
  ]),
  title: 'Format'
}, {
  name: 'timerColor',
  rules: getRules([
    'isEmpty'
  ]),
  title: 'Timer color'
}];
