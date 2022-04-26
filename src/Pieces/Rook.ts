import { files, letterRef } from "../utils/utils";
import { Piece, Position } from "./PiecesAndPosition";

export class Rook extends Piece {
  canMoveTo(newPosition: Position, positions: string[]): boolean {
    const { file: fileDist, rank: rankDist } = newPosition.distanceFrom(
      this.position
    );
    const { file: pieceFile, rank: pieceRank } = this.position.getPosition();
    const { file: newFile, rank: newRank } = newPosition.getPosition();

    const canMove = !fileDist || !rankDist;

    const ignoreYourself = positions.filter(
      (p) => p !== `${pieceFile}${pieceRank}`
    );

    let isInWay: boolean = false;

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
