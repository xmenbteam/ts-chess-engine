export type PositionDiff = {
  file: number;
  rank: number;
};

export enum Colour {
  "White",
  "Black",
}

export const colourRef: { [key: string]: number } = {
  White: 0,
  Black: 1,
};

export type FuncProps = [RankFile, RankFile, string[]];

export type RankFile = { file: string; rank: number };
export type RankFileDist = { file: number; rank: number };
export type PieceObject = {
  [key: string]: any;
};
export type CustomPieceObject = { piece: string; colour: number };
export type CustomPieceArray = CustomPieceObject[];
export type MoveToObj = { hasMoved: boolean; moveCount?: number };
