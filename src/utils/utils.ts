import { Piece } from "../Pieces/PiecesAndPosition";

export const letterRef: { [file: string]: number } = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
};

export const files: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const ranks: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

// export const chessConverter = (string: string) => {};

export const pawnTest = /^[a-h][1-8]/;

export const switchFunc = (thing: string, object: object) => {
  const entries = Object.entries(object);
  for (const [key, value] of entries) {
    if (key === thing) return typeof value === "function" ? value() : value;
  }

  return "Not worked!";
};
