'use strict';

export const getOptions = (keys = [], options = []) => {
  const output = {};

  options.forEach(option => {
    if((/--/).test(option)) {
      const [optionName, value] = option.replace(/--/, '').split('=');

      if(keys.includes(optionName))
        output[optionName] = value;
    }
  });

  return output;
};
