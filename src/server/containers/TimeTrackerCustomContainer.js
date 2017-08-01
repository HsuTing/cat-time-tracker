'use strict';

import {
  createFragmentContainer,
  graphql
} from 'react-relay';

import TimeTrackerCustom from 'componentsTimeTracker/Custom';

export default createFragmentContainer(
  TimeTrackerCustom, graphql`
    fragment TimeTrackerCustomContainer_setting on Setting {
      tags {
        tagsGroup {
          edges {
            node {
              name
              color
            }
          }
        }
      }
    }
  `
);
