'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers} from 'redux';
import {formReducer} from 'cat-components/lib/input-redux';

import Index from 'components/Index';

const reducer = combineReducers(formReducer);

(() => {
  ReactDOM.render(
    <Index data={data}
      router={{isServer: false}}
      redux={{reducer}}
    />,
    document.getElementById('root')
  );
})();
