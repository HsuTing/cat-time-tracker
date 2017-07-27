'use strict';

import white from 'cat-components/lib/color/white';

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
