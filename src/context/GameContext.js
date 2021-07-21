import React, { useState } from 'react';

export const GameContext = React.createContext({});

const GameContextProvider = ({ children }) => {
  const [level, setLevel] = useState(1);

  return (
    <GameContext.Provider value={{ level, setLevel }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
