'use strict';

import {
  createFragmentContainer,
  graphql
} from 'react-relay';

import Tags from 'componentsShare/Tags';

export default createFragmentContainer(
  Tags, graphql`
    fragment TagsContainer_setting on Setting {
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
