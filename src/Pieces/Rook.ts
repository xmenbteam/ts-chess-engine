import { files, ranks } from "../utils/utils";
import { Piece } from "./Pieces";

export class Rook extends Piece {
  canMoveTo(): Array<{ file: string; rank: number }> {
    const currentPosition = this.position.getPosition();
    const possibleMoves = [];

    // create array with every file/same rank
    for (let i = 0; i < files.length; i++) {
      if (files[i] !== currentPosition.file) {
        possibleMoves.push({ file: files[i], rank: currentPosition.rank });
      }
    }
    // also every rank/same file
    for (let i = 0; i < ranks.length; i++) {
      if (ranks[i] !== currentPosition.rank) {
        possibleMoves.push({ file: currentPosition.file, rank: ranks[i] });
      }
    }
    return possibleMoves;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
