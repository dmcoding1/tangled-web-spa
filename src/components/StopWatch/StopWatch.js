import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import useStopwatch from '../../hooks/useStopWatch';

const StopWatch = ({ stopCondition }) => {
  const { time, startTimer, stopTimer } = useStopwatch();

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    if (stopCondition) {
      stopTimer();
    }
  }, [stopCondition]);

  return <div>Timer: {time}</div>;
};

StopWatch.propTypes = {
  stopCondition: PropTypes.bool.isRequired,
};

export default StopWatch;
