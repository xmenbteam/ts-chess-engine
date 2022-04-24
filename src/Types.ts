export type PositionDiff = {
  file: number;
  rank: number;
};

export enum Colour {
  "WHITE",
  "BLACK",
}

export enum FileEnum {
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
}

export type RankFile = { file: string; rank: number };
