'use strict';

import {
  GraphQLBoolean
} from 'graphql';
import {
  mutationWithClientMutationId,
  fromGlobalId
} from 'graphql-relay';
import {inputCheck} from 'cat-components/lib/input-redux';

import timeTracker from 'fields/timeTracker';
import {newTimeTracker} from 'db/set';
import checkTime from 'db/checkTime';

import {dataFields} from './dataType';

const {todo_id, ...fields} = dataFields.fields;

export default mutationWithClientMutationId({
  name: 'AddTime',
  description: 'Add the data of the Time.',
  inputFields: {
    ...fields,
    id: {
      ...todo_id
    }
  },
  outputFields: {
    status: {
      description: 'Use to check if adding the Time successes.',
      type: GraphQLBoolean
    }
  },
  mutateAndGetPayload: async (args, {name}) => {
    const data = {
      ...args,
      id: fromGlobalId(args.id).id
    };

    const check = timeTracker.map(({name, rules}, index) => {
      return inputCheck(args[name], rules);
    }).reduce((nowCheck, {isError}) => {
      return nowCheck || isError;
    }, false);

    if(!check && await checkTime(name, data))
      return {
        status: (await newTimeTracker(name, data))
      };

    return {
      status: false
    };
  }
});
