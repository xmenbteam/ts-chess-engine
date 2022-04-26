import { files, letterRef } from "../utils/utils";
import { Piece, Position } from "./PiecesAndPosition";

export class King extends Piece {
  canMoveTo(newPosition: Position, positions: string[]): boolean {
    const { file: fileDist, rank: rankDist } = newPosition.distanceFrom(
      this.position
    );

    const { file: pieceFile, rank: pieceRank } = this.position.getPosition();
    const { file: newFile, rank: newRank } = newPosition.getPosition();

    const canMove =
      (Math.abs(fileDist) === 1 && Math.abs(rankDist) === 1) ||
      (Math.abs(fileDist) === 1 && !Math.abs(rankDist)) ||
      (!Math.abs(fileDist) && Math.abs(rankDist) === 1);

    const pieceCoords = `${pieceFile}${pieceRank}`;

    const ignoreYourself = positions.filter((p) => p !== pieceCoords);

    let isInWay: boolean = false;

    const wrongSquares = [
      `${files[letterRef[pieceFile] - 1]}${pieceRank}`,
      `${files[letterRef[pieceFile] - 1]}${pieceRank + 1}`,
      `${files[letterRef[pieceFile]]}${pieceRank + 1}`,
      `${files[letterRef[pieceFile] + 1]}${pieceRank + 1}`,
      `${files[letterRef[pieceFile] + 1]}${pieceRank}`,
      `${files[letterRef[pieceFile] + 1]}${pieceRank - 1}`,
      `${files[letterRef[pieceFile]]}${pieceRank - 1}`,
      `${files[letterRef[pieceFile] - 1]}${pieceRank - 1}`,
    ];

    wrongSquares.forEach((squ) => {
      if (ignoreYourself.includes(squ)) isInWay = true;
    });

    if (canMove && !isInWay) return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
