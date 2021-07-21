import { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const useGameContext = () => {
  const { level, setLevel } = useContext(GameContext);

  return { level, setLevel };
};

export default useGameContext;
