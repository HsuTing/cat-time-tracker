#!/bin/bash

echo "{\
  \"apiKey\": \"$apiKey\",\
  \"authDomain\": \"$authDomain\",\
  \"databaseURL\": \"$databaseURL\",\
  \"projectId\": \"$projectId\",\
  \"storageBucket\": \"$storageBucket\",\
  \"messagingSenderId\": \"$messagingSenderId\",\
  \"email\": \"$email\",\
  \"password\": \"$password\"\
}" > ./../.time-tracker.json
