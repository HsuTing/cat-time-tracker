'use strict';

import fs from 'fs';
import path from 'path';
import process from 'process';

export default () => {
  let root = process.cwd();
  let check = false;

  do {
    check = fs.existsSync(path.resolve(root, 'package.json'));

    if(!check)
      root = path.resolve(root, './../');
  } while(!check && root !== '/')

  if(root === '/')
    throw new Error('Can not find package.json');

  return require(path.resolve(root, 'package.json'));
};
