'use strict';

import {
  nodeDefinitions,
  fromGlobalId
} from 'graphql-relay';

export default nodeDefinitions(
  async (globalId, ctx) => {
    const {type} = fromGlobalId(globalId);

    switch(type) {
      default: return null;
    }
  }, obj => {
    return null;
  }
);
