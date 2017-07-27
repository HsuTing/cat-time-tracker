'use strict';

import morgan from 'koa-morgan';
import chalk from 'chalk';

import server from './server/index';

export default port => {
  const app = server(true, app => {
    app.use(morgan('dev'));
  });

  console.log(chalk.cyan(`open server at port ${port || 9000}.`));
  app.listen(port || 9000);
};
