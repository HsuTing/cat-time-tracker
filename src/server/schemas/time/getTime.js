'use strict';

import {
  time as getTime
} from 'db/get';

import {timeGroupType} from './dataType';

export default {
  description: 'Get the data of the Time.',
  type: timeGroupType,
  resolve: async (parent, args, {name}) => (await(getTime({name})))
};
