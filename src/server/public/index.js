'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Index from 'components/Index';

(() => {
  ReactDOM.render(
    <Index data={data}
      router={{isServer: false}}
    />,
    document.getElementById('root')
  );
})();
