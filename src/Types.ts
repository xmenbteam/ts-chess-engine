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

export type FuncProps = [string, number, string, number, string[]];

export type RankFile = { file: string; rank: number };
