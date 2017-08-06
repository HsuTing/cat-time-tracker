'use strict';

import {
  commitMutation,
  graphql
} from 'react-relay';

import environment from 'utils/environment';

const mutation = graphql`
  mutation addTimerMutation(
    $input: AddTimeInput!
  ) {
    addTime(input: $input) {
      status
    }
  }
`;

export default (input, callback) => {
  commitMutation(
    environment, {
      mutation,
      variables: {
        input
      },
      onCompleted: response => {
        if(response.addTime.status) {
          callback();
          return;
        }

        alert('Server error');
      },
      onError: err => console.error(err)
    }
  );
};
