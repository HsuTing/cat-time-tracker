'use strict';

import * as grey from 'cat-components/lib/color/grey';

export const title = {
  margin: '0px 0px 15px'
};

export const root = isEnd => ({
  display: 'grid',
  gridTemplateColumns: '30px auto',
  padding: '5px 0px',
  ...(isEnd ? {} : {
    borderBottom: `1px solid ${grey._200_}`
  })
});

export const toggle = {
  color: grey._500_,
  lineHeight: '25px'
};

export const status = {
  display: 'inline-block',
  lineHeight: '25px',
  color: grey._400_
};

export const tag = {
  display: 'inline-block',
  margin: '0px 5px',
  lineHeight: '25px',
  fontSize: '12px',
  cursor: 'initial'
};

export const note = {
  margin: '5px 0px 0px'
};
