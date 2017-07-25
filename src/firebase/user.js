'use strict';

import * as firebase from 'firebase';

export const add = async (email, password) => {
  return await firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const login = async (email, password) => {
  return await firebase.auth().signInWithEmailAndPassword(email, password);
};
