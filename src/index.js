require('file-loader?name=[name].[ext]!./index.html');
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GameContextProvider from './context/GameContext';

import './index.scss';

const appRoot = document.getElementById('app');

if (appRoot) {
  ReactDOM.render(
    <React.StrictMode>
      <GameContextProvider>
        <App />
      </GameContextProvider>
    </React.StrictMode>,
    appRoot
  );
}
