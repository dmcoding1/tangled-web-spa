import React from 'react';
import PropTypes from 'prop-types';

import useGameContext from '../../hooks/useGameContext';

import './WinView.scss';

import spiderman from '../../images/spiderman2.png';

const WinView = ({ movesCount }) => {
  const { level, setLevel } = useGameContext();

  const handleClick = () => {
    setLevel((prevLevel) => prevLevel + 1);
  };

  return (
    <div className="win">
      <img src={spiderman} alt="" className="win__img" />
      Wow! You untangled the web in {movesCount}{' '}
      {movesCount > 1 ? 'moves' : 'move'}!
      <br />
      Thank you for your help.
      {level > 5 ? (
        <>
          <br />
          You completed all levels. Congratulations.
        </>
      ) : (
        <button className="win__link" onClick={handleClick}>
          Next Level
        </button>
      )}
    </div>
  );
};

WinView.propTypes = {
  movesCount: PropTypes.number.isRequired,
};

export default WinView;
