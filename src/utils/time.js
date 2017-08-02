'use strict';

import moment from 'moment';

export const getTime = (start, end) => {
  const diff = end.format('x') - start.format('x');
  const diffTime = moment.duration(diff);

  return {
    hours: diffTime.days() * 24 + diffTime.hours(),
    minutes: diffTime.minutes(),
    seconds: diffTime.seconds()
  };
};
