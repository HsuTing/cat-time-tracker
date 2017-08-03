'use strict';

import HomeContainer from 'containers/HomeContainer';

import TimeTrackerContainer from 'containers/TimeTrackerContainer';
import TimeTrackerChooseTodo from 'componentsTimeTracker/ChooseTodo';
import TimeTrackerCustomContainer from 'containers/TimeTrackerCustomContainer';
import TimeTrackerTimer from 'componentsTimeTracker/Timer';

import ModifyTodoContainer from 'containers/ModifyTodoContainer';

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
    Component: TimeTrackerCustomContainer
  }, {
    title: 'Timer',
    path: '/timer/',
    Component: TimeTrackerTimer
  }]
}, {
  title: 'Todo',
  path: '/todo/',
  Component: ModifyTodoContainer
}];
