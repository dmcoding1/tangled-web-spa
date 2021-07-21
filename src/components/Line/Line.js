import React, {useMemo} from 'react'
import PropTypes from 'prop-types';

import './Line.scss';

const Line = ({x1, y1, x2, y2}) => {
  const width = useMemo(() => {
    const x = x1 - x2;
    const y = y1 - y2;
    return Math.sqrt(x**2 + y**2);
  }, [x1, x2, y1, y2])

  const angle = useMemo(() => {
    const x = x2 - x1;
    const y = y2 - y1;
    const degrees = Math.atan2(y, x) * 180 / Math.PI;
    return degrees.toFixed(2);
  }, [x1, x2, y1, y2])

  const transformOrigin = useMemo(() => {
    const isAngleSharp = angle > -90 && angle < 90;
    return {
      horizontal: x1 < x2 ? 'left' : isAngleSharp ? 'right' : 'left',
      vertical: y1 < y2 ? 'top' : isAngleSharp ? 'bottom' : 'top'
    }
  }, [x1, x2, y1, y2])

  const style = {
    top: y1,
    left: x1,
    transform: `rotate(${angle}deg)`,
    transformOrigin: `${transformOrigin.vertical} ${transformOrigin.horizontal}`,
    width
  }

  return (
    <span className="line" style={style}></span>
  )
}

Line.propTypes = {
  x1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired
};

export default Line
