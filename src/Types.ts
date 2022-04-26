import { StringMappingType } from "typescript";

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
export type FuncProps = [RankFile, RankFile, string[]];

export type RankFile = { file: string; rank: number };
export type RankFileDist = { file: number; rank: number };
