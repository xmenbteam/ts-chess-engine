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

export const pawnTest = /^[a-h]\d$/;
export const pieceTest = /^[RNQBK][a-h]\d$/;
export const fileReg = /[a-h]/;
export const rankReg = /[1-8]/;

export const castleRefObj = {
  oldKingCoord: ["Ke1", "Ke8"],
  oldRookCoord: [
    ["Rh1", "Ra1"],
    ["Rh8", "Ra8"],
  ],
  newKingFile: ["g", "c"],
  newRookFile: ["f", "d"],
  rank: [1, 8],
};
