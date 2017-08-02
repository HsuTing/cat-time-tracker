'use strict';

import radium from 'radium';
import * as grey from 'cat-components/lib/color/grey';

export const root = {
  display: 'grid',
  gridTemplateColumns: 'auto 220px auto'
};

export const timerRoot = {
  position: 'relative',
  width: '220px',
  height: '220px',
  cursor: 'pointer'
};

export const circle = {
  position: 'absolute',
  top: '0px',
  left: '0px',
  width: '210px',
  height: '210px',
  border: `5px solid ${grey._200_}`,
  borderRadius: '50%'
};

export const timer = isRunning => ({
  position: 'absolute',
  top: '0px',
  left: '0px',
  width: '220px',
  height: '220px',
  color: isRunning ? grey._800_ : grey._200_,
  textAlign: 'center',
  lineHeight: '220px',
  animation: 'x 0.1s ease-in-out',
  animationName: radium.keyframes({
    '0%': {color: isRunning ? grey._200_ : grey._800_},
    '100%': {color: isRunning ? grey._800_ : grey._200_}
  })
});

export const content = {
  root: {
    margin: '50px 0px 0px',
    padding: '25px 0px 0px',
    borderTop: `1px solid ${grey._200_}`,
    fontSize: '12px'
  },

  tag: {
    fontSize: '15px'
  }
};
