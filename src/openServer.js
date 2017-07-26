'use strict';

import morgan from 'koa-morgan';

import server from './server/index';

export default () => {
  const app = server(true, app => {
    app.use(morgan('dev'));
  });

  app.listen(9000);
};
