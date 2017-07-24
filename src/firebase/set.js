'use strict';

import * as firebase from 'firebase';

export const newTimeTracker = async ({
  name,
  tag,
  note,
  start,
  end
}) => {
  const projectsRef = firebase.database().ref(`/projects/${name}/`);
  const newRef = projectsRef.push();

  await newRef.set({
    tag,
    note,
    start,
    end
  });

  return true;
};
