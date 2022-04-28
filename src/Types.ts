import { Piece } from "./Classes/PieceClasses/PiecesAndPosition";

export type PositionDiff = {
  file: number;
  rank: number;
};

export enum Colour {
  "WHITE",
  "BLACK",
}

export type FuncProps = [RankFile, RankFile, string[]];

export type RankFile = { file: string; rank: number };
export type RankFileDist = { file: number; rank: number };
export type PieceObject = { [key: string]: Piece };
export type CustomPieceObject = { piece: string; colour: number };
export type CustomPieceArray = CustomPieceObject[];
