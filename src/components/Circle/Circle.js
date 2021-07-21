import React from 'react';
import PropTypes from 'prop-types';

import './Circle.scss';

import spiderman from '../../images/spiderman.png';

const Circle = ({ id, x, y, handleDown, handleUp, handleDrag }) => {
  return (
    <span
      className="circle"
      data-id={id}
      style={{ left: x, top: y }}
      onTouchStart={handleDown}
      onTouchEnd={handleUp}
      onDragEnd={handleDrag}
      draggable
    >
      <img src={spiderman} alt="" />
    </span>
  );
};

Circle.propTypes = {
  id: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  handleDown: PropTypes.func.isRequired,
  handleUp: PropTypes.func.isRequired,
  handleDrag: PropTypes.func.isRequired,
};

export default Circle;
