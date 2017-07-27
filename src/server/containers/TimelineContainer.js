'use strict';

import {
  createRefetchContainer,
  graphql
} from 'react-relay';

import Timeline from 'components/Timeline';

export default createRefetchContainer(
  Timeline, graphql.experimental`
    fragment TimelineContainer_time on TimeGroup @argumentDefinitions(
      tags: {type: "[String]", defaultValue: []}
    ) {
      timeGroup(
        tags: $tags
      ) {
        edges {
          node {
            tag
            note
            start
            end
          }
        }
      }
    }
  `, graphql.experimental`
    query TimelineContainerQuery($tags: [String]) {
      time {
        ...TimelineContainer_time @arguments(tags: $tags)
      }
    }
  `
);
