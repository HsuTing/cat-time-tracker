'use strict';

import fs from 'fs';
import path from 'path';
import process from 'process';
import Router from 'koa-better-router';
import React from 'react';
import reactRender from 'cat-middleware/lib/koa-react-render';
import {combineReducers} from 'redux';
import {formReducer} from 'cat-components/lib/input-redux';

import Index from 'components/Index';
import pages from 'constants/pages';

const ENV = process.env.NODE_ENV === 'production';
const router = Router().loadMethods();

let root = process.cwd();

do {
  if(fs.existsSync(path.resolve(root, '.time-tracker.json')))
    break;

  root = path.resolve(root, './../');
} while(root !== '/')

const {email} = require(path.resolve(root, '.time-tracker.json'));
const data = {
  email
};

const reducer = combineReducers(formReducer);

pages.forEach(({path}) => {
  router.get(path, (ctx, next) => reactRender(
    <Index data={data}
      router={{
        isServer: true,
        location: ctx.request.url,
        context: {}
      }}
      redux={{reducer}}
    />, {
      js: 'index',
      ENV,
      data: JSON.stringify(data)
    }
  )(ctx, next))
});

export default router;
