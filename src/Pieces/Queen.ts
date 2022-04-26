import { Piece, Position } from "./PiecesAndPosition";
import { letterRef, files } from "../utils/utils";

export class Queen extends Piece {
  canMoveTo(newPosition: Position, positions: string[]): boolean {
    const { file: fileDist, rank: rankDist } = newPosition.distanceFrom(
      this.position
    );
    const { file: pieceFile, rank: pieceRank } = this.position.getPosition();
    const { file: newFile, rank: newRank } = newPosition.getPosition();

    const canMove =
      !fileDist || !rankDist || Math.abs(fileDist) === Math.abs(rankDist);

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

    for (let i = pieceRank; i <= newRank; i++) {
      if (ignoreYourself.includes(`${pieceFile}${i}`)) isInWay = true;
    }

    for (let i = letterRef[pieceFile]; i <= letterRef[newFile]; i++) {
      if (ignoreYourself.includes(`${files[i]}${pieceRank}`)) isInWay = true;
    }

    if (canMove && !isInWay) return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
