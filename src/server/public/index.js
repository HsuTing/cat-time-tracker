'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers} from 'redux';
import {formReducer} from 'cat-components/lib/input-redux';

import Index from 'components/Index';

const redux = {};
redux.reducer = combineReducers(formReducer);

if(process.env.NODE_ENV !== 'production') {
  const {createLogger} = require('redux-logger');
  redux.enhancer = createLogger({collapsed: true});
}

(() => {
  ReactDOM.render(
    <Index data={data}
      router={{isServer: false}}
      redux={redux}
    />,
    document.getElementById('root')
  );
})();
