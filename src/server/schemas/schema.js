'use strict';

import 'babel-polyfill';
import fs from 'fs';
import path from 'path';
import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql';

import fields from 'schemas/fields';

const {nodeField} = fields;

let query = {
  node: nodeField
};
let mutation = {};

fs.readdirSync(__dirname)
  .filter(file => !(file[0] === '.' || file === 'schema.js'))
  .forEach(file => {
    if(!fs.existsSync(path.resolve(__dirname, `./${file}/index.js`)))
      return;

    const name = file.replace('.js', '');
    const schema = require(`./${name}`).default || require(`./${name}`);

    query = {
      ...query,
      ...schema.query
    };

    mutation = {
      ...mutation,
      ...schema.mutation
    };
  });

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'all queries',
    fields: query
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    description: 'all mutations',
    fields: mutation
  })
});
