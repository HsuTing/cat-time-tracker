'use strict';

import HomeContainer from 'containers/HomeContainer';

import TimeTrackerContainer from 'containers/TimeTrackerContainer';
import TimeTrackerChooseTodo from 'componentsTimeTracker/ChooseTodo';
import TimeTrackerCustom from 'componentsTimeTracker/Custom';
import TimeTrackerTimer from 'componentsTimeTracker/Timer';

export default [{
  title: 'Home',
  path: '/',
  Component: HomeContainer
}, {
  title: 'Time tracker',
  path: '/time-tracker/',
  Component: TimeTrackerContainer,
  pages: [{
    title: 'Add',
    path: '/',
    Component: TimeTrackerChooseTodo
  }, {
    title: 'Custom',
    path: '/custom/',
    Component: TimeTrackerCustom
  }, {
    title: 'Timer',
    path: '/timer/',
    Component: TimeTrackerTimer
  }]
}];
