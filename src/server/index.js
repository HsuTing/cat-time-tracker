'use strict';

import 'babel-polyfill';
import fs from 'fs';
import path from 'path';
import Koa from 'koa';
import mount from 'koa-mount';
import serve from 'koa-static';
import graphql from 'koa-graphql';

import schema from 'schemas/schema';

import getPkg from './../getPkg';

const app = new Koa();
const root = path.resolve(__dirname, './../../');

export default (env, func = () => {}) => {
  func(app);

  app.use(async (ctx, next) => {
    const {name, homepage} = await getPkg();
    ctx.name = name;
    ctx.homepage = homepage;

    return await next();
  });

  app.use(mount('/public', serve(
    path.resolve(root, 'public')
  )));

  app.use(mount('/graphql', graphql({
    schema,
    graphiql: env,
    pretty: env
  })));

  // add router
  fs.readdirSync(path.resolve(__dirname, './routers'))
    .forEach(router => {
      const routerPath = `./routers/${router.replace('.js', '')}`;
      app.use(
        (require(routerPath).default || require(routerPath)).middleware()
      );
    });

  return app;
};
