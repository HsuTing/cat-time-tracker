'use strict';

import HomeContainer from 'containers/HomeContainer';

import TimeTrackerContainer from 'containers/TimeTrackerContainer';
import TimeTrackerChooseTodo from 'componentsTimeTracker/ChooseTodo';
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
    title: 'Timer',
    path: '/timer/',
    Component: TimeTrackerTimer
  }]
}];
