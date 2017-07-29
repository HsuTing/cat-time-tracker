'use strict';

import HomeContainer from 'containers/HomeContainer';
import TimeTracker from 'components/TimeTracker';

export default [{
  title: 'Home',
  path: '/',
  Component: HomeContainer
}, {
  title: 'Time tracker',
  path: '/time-tracker/',
  Component: TimeTracker
}];
