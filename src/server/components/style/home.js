'use strict';

import * as layoutStyle from 'cat-components/lib/layout';
import * as grey from 'cat-components/lib/color/grey';

export const grid = {
  display: 'grid',
  gridTemplateColumns: 'calc(50% - 15px) calc(50% - 15px)',
  gridGap: '30px',
  ...layoutStyle.phone({
    gridTemplateColumns: 'initial'
  })
};

export const col = {
  padding: '25px 20px',
  minHeight: '50px',
  border: `1px solid ${grey._200_}`,
  boxShadow: '1px 0 5px rgba(0, 0, 0, 0.2)',
  ...layoutStyle.phone({
    minHeight: '100px'
  })
};

export const tags = {
  display: 'inline-block',
  margin: '0px 15px 0px 0px',
  fontSize: '15px',
  lineHeight: '25px',
  userSelect: 'none',
  cursor: 'pointer'
};

export const toggle = {
  margin: '0px 5px 0px 0px',
  color: grey._500_,
  verticalAlign: 'top'
};

export const timeline = {
  root: {
    margin: '100px 0px 0px'
  },

  title: {
    display: 'inline-block',
    width: '35px'
  },

  time: {
    margin: '2px 0px',
    fontSize: '12px',
    color: grey._500_
  },

  note: {
    margin: '10px 0px 15px',
    minHeight: '70px'
  }
};
