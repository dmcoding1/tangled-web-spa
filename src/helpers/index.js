import { indexesToRemove } from '../constants';

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateGameItemsPositions = (level, maxX, maxY) => {
  const itemsAmount = level + 3;
  const items = [...Array(itemsAmount)].map((_, index) => {
    const x = getRandomInt(50, maxX - 50);
    const y = getRandomInt(50, maxY - 50);
    return {
      id: index,
      x,
      y,
    };
  });

  let lines = generateLinesPositions(items);

  if (items.length > 4) {
    lines = removeItemAtIndex(lines, ...indexesToRemove[items.length]);
  }

  const isIntersecting = checkLinesIntersection(lines);

  if (!isIntersecting) {
    return generateGameItemsPositions(level, maxX, maxY);
  }

  return [items, lines];
};

export const generateLinesPositions = (items) => {
  let lines = [];
  for (let i = 0; i < items.length; i++) {
    const { x: x1, y: y1 } = items[i];
    for (let j = 0; j < i; j++) {
      const { x: x2, y: y2 } = items[j];
      lines.push({ id: `${i}-${j}`, x1, x2, y1, y2 });
    }
  }

  if (items.length > 4) {
    lines = removeItemAtIndex(lines, ...indexesToRemove[items.length]);
  }

  return lines;
};

export const getCords = (x, y, boardData) => {
  const { left, right, top, bottom, width, height } = boardData;

  let newX;
  let newY;

  if (x - left < 0) {
    newX = 25;
  } else if (x - right > 0) {
    newX = width - 25;
  } else {
    newX = x - left;
  }

  if (y - top < 0) {
    newY = 25;
  } else if (y - bottom > 0) {
    newY = height - 25;
  } else {
    newY = y - top;
  }

  return { newX, newY };
};

export const checkLinesIntersection = (lines) => {
  let isIntersecting = false;

  mainLoop: for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < i; j++) {
      if (intersects(lines[i], lines[j])) {
        isIntersecting = true;
        break mainLoop;
      }
    }
  }

  return isIntersecting;
};

// returns true if the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
const intersects = (firstLine, secondLine) => {
  const { x1: a, y1: b, x2: c, y2: d } = firstLine;
  const { x1: p, y1: q, x2: r, y2: s } = secondLine;
  let det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
  }
};

const removeItemAtIndex = (arr, ...indexes) =>
  arr.filter((_, i) => !indexes.includes(i));
