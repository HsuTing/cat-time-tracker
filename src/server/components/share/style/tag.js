'use strict';

import white from 'cat-components/lib/color/white';
import grey from 'cat-components/lib/color/grey';

export const root = {
  margin: '0px 0px 15px',
  userSelect: 'none',
  cursor: 'pointer'
};

export const background = color => ({
  padding: '2px 10px',
  color: white,
  background: color,
  borderRadius: '2px'
});

export const toggle = {
  margin: '0px 5px 0px 0px',
  color: grey,
  verticalAlign: 'top'
};
