import React from 'react';

import Board from './components/Board/Board';
import './App.scss';
import bgImage from './images/night.jpg';

const App = () => {
  return (
    <main className="container">
      <img className="background-img" src={bgImage} alt="" />

      <Board />
    </main>
  );
};

export default App;
