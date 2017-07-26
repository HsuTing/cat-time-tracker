'use strict';

import white from 'cat-components/lib/color/white';
import grey from 'cat-components/lib/color/grey';

export const content = {
  tag: {
    margin: '0px 0px 15px'
  },

  tagBackground: color => ({
    padding: '2px 10px',
    color: white,
    background: color,
    borderRadius: '2px'
  }),

  title: {
    display: 'inline-block',
    width: '35px'
  },

  time: {
    margin: '2px 0px',
    fontSize: '12px',
    color: grey
  },

  note: {
    margin: '10px 0px 15px',
    minHeight: '70px'
  }
};
