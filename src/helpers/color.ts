import { randomNumber, roundToFixed } from './number';

export type RGB = [number, number, number];

export const randomRGB = (difficulty: number): RGB => {
  if (difficulty < 0 || difficulty > 255) {
    throw Error(`difficulty ${difficulty} is not [0, 255]`);
  }

  if (difficulty % 1 !== 0) {
    throw Error(`difficulty ${difficulty} is not an integer`);
  }

  const [r, g, b] = [randomNumber(0, difficulty), randomNumber(0, difficulty), randomNumber(0, difficulty)];

  return normaliseRGB([r, g, b], difficulty);
};

export const normaliseRGB = ([r, g, b]: RGB, max: number): RGB => {
  const normalise = (n: number): number => {
    const step = 255 / max;
    return roundToFixed(n * step, 2);
  };

  return [normalise(r), normalise(g), normalise(b)];
};

export const rgbToCssColor = ([r, g, b]: RGB): string => {
  return `rgb(${roundToFixed(r, 2)}, ${roundToFixed(g, 2)}, ${roundToFixed(b, 2)})`;
};

export const isRGBEqual = (rgb1: RGB, rgb2: RGB): boolean => {
  return rgb1.every((v, i) => v === rgb2[i]);
};
