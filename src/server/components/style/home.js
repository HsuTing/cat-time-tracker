'use strict';

import * as layoutStyle from 'cat-components/lib/layout';
import * as grey from 'cat-components/lib/color/grey';

export const grid = {
  display: 'grid',
  gridTemplateColumns: 'calc(50% - 15px) calc(50% - 15px)',
  gridGap: '30px',
  ...layoutStyle.tablet({
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
  lineHeight: '25px'
};

export const timeline = {
  margin: '100px 0px 0px'
};
