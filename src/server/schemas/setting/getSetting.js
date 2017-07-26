'use strict';

import {
  setting as getSetting
} from 'db/get';

import settingType from './dataType';

export default {
  description: 'Get the data of the Setting.',
  type: settingType,
  resolve: async () => (await(getSetting()))
};
