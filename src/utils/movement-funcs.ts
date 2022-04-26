import { letterRef, files } from "./utils";

export const rankAndFileInTheWay = (
  pieceFile: string,
  pieceRank: number,
  newFile: string,
  newRank: number,
  positions: string[]
) => {
  let isInWay: boolean = false;
  const pieceCoords = `${pieceFile}${pieceRank}`;
  const ignoreYourself = positions.filter((p) => p !== pieceCoords);

  for (let i = pieceRank; i <= newRank; i++) {
    if (ignoreYourself.includes(`${pieceFile}${i}`)) isInWay = true;
  }

  for (let i = letterRef[pieceFile]; i <= letterRef[newFile]; i++) {
    if (ignoreYourself.includes(`${files[i]}${pieceRank}`)) isInWay = true;
  }

  return isInWay;
};

export const diagonalInTheWay = (
  pieceFile: string,
  pieceRank: number,
  newFile: string,
  newRank: number,
  positions: string[]
) => {
  const pieceCoords = `${pieceFile}${pieceRank}`;
  const ignoreYourself = positions.filter((p) => p !== pieceCoords);

  let isInWay: boolean = false;

  // Checks if piece is moving SOUTHEAST
  for (let i = newRank; i < pieceRank; i++) {
    const square = `${files[pieceRank + i - 1]}${pieceRank - i}`;
    if (ignoreYourself.includes(square)) isInWay = true;
  }
  // Checks if piece is moving NORTHEAST
  for (
    let i = letterRef[pieceFile], j = pieceRank;
    i < letterRef[newFile];
    i++, j++
  ) {
    const square = `${files[i]}${j}`;
    console.log({ square, pieceCoords });
    if (ignoreYourself.includes(square)) isInWay = true;
  }
  // Checks if piece is moving SOUTHWEST
  for (let i = pieceRank; i >= newRank; i--) {
    const square = `${files[pieceRank - i]}${pieceRank - i + 1}`;
    if (ignoreYourself.includes(square)) isInWay = true;
  }
  // Checks if piece is moving NORTHWEST
  for (let i = pieceRank; i < newRank; i++) {
    const square = `${files[i - pieceRank]}${newRank - i + pieceRank}`;
    if (ignoreYourself.includes(square)) isInWay = true;
  }

  return isInWay;
};
