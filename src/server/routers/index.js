'use strict';

import process from 'process';
import Router from 'koa-better-router';
import React from 'react';
import reactRender from 'cat-middleware/lib/koa-react-render';

import Index from 'components/Index';

const ENV = process.env.NODE_ENV === 'production';
const router = Router().loadMethods();

router.get('/', reactRender(<Index />, {
  js: 'index',
  ENV
}));

export default router;
