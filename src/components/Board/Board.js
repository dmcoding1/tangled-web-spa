import React, { useCallback, useEffect, useState } from 'react';

import Circle from '../Circle/Circle';
import Line from '../Line/Line';
import StopWatch from '../StopWatch/StopWatch';
import WinView from '../WinView/WinView';
import useGameContext from '../../hooks/useGameContext';
import {
  checkLinesIntersection,
  generateGameItemsPositions,
  generateLinesPositions,
  getCords,
} from '../../helpers';

import './Board.scss';

const Board = () => {
  const [boardSize, setBoardSize] = useState(null);
  const [circlePositions, setCirclePositions] = useState(null);
  const [linePositions, setLinePositions] = useState(null);
  const [isDraggable, setIsDraggable] = useState(false);
  const [isLevelOver, setIsLevelOver] = useState(false);
  const [movesCount, setMovesCount] = useState(0);

  const { level } = useGameContext();

  const board = useCallback((node) => {
    if (node !== null) {
      const dimensions = node.getBoundingClientRect();
      setBoardSize(dimensions);
    }
  }, []);

  useEffect(() => {
    if (boardSize && level <= 5) {
      const [circles, lines] = generateGameItemsPositions(
        level,
        boardSize.width,
        boardSize.height
      );

      setCirclePositions(circles);
      setLinePositions(lines);
      setIsLevelOver(false);
      setMovesCount(0);
    }

    if (level > 5) {
      setIsLevelOver(true);
    }
  }, [boardSize, level]);

  useEffect(() => {
    if (circlePositions) {
      const positions = generateLinesPositions(circlePositions);
      setLinePositions(positions);
    }
  }, [circlePositions]);

  useEffect(() => {
    if (linePositions) {
      const isIntersecting = checkLinesIntersection(linePositions);

      if (!isIntersecting && !isDraggable) setIsLevelOver(true);
    }
  }, [linePositions, isDraggable]);

  const handleDown = () => {
    setIsDraggable(true);
  };

  const handleUp = () => {
    setIsDraggable(false);
    setMovesCount((prevMoves) => prevMoves + 1);
  };

  const handleMove = (e) => {
    if (isDraggable) {
      const id = +e.target.dataset.id;

      if (isNaN(id)) return;

      let touch = undefined;

      if (e.touches) {
        touch = e.touches[0];
      }

      const { newX, newY } = getCords(
        e.pageX || touch.pageX,
        e.pageY || touch.pageY,
        boardSize
      );

      const newCirclePositions = circlePositions.map((circle) => {
        if (circle.id === id) {
          return { id, x: newX, y: newY };
        }

        return circle;
      });

      setCirclePositions(newCirclePositions);
    }
  };

  const handleDrag = (e) => {
    const id = +e.target.dataset.id;

    const { newX, newY } = getCords(e.pageX, e.pageY, boardSize);

    const newCirclePositions = circlePositions.map((circle) => {
      if (circle.id === id) {
        return { id, x: newX, y: newY };
      }

      return circle;
    });

    setCirclePositions(newCirclePositions);
    setMovesCount((prevMoves) => prevMoves + 1);
  };

  return (
    <>
      <header className="game-info">
        <StopWatch stopCondition={isLevelOver} />
        <div>Moves: {movesCount}</div>
      </header>
      <div className="board" ref={board} onTouchMove={handleMove}>
        {circlePositions &&
          circlePositions.map(({ id, x, y }) => (
            <Circle
              key={id}
              id={id}
              x={x}
              y={y}
              setCirclePositions={setCirclePositions}
              boardSize={boardSize}
              handleDown={handleDown}
              handleUp={handleUp}
              handleDrag={handleDrag}
            />
          ))}
        {linePositions &&
          linePositions.map(({ id, x1, x2, y1, y2 }) => (
            <Line key={id} x1={x1} x2={x2} y1={y1} y2={y2} />
          ))}

        {isLevelOver && <WinView movesCount={movesCount} />}
      </div>
    </>
  );
};

export default Board;
