import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import useStopwatch from '../../hooks/useStopWatch';
import useGameContext from '../../hooks/useGameContext';

const StopWatch = ({ stopCondition }) => {
  const { time, startTimer, stopTimer, resetTimer } = useStopwatch();
  const { level } = useGameContext();

  useEffect(() => {
    resetTimer();
    startTimer();
  }, [level]);

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
