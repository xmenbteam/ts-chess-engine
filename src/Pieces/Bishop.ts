import { files, ranks } from "../utils/utils";
import { Piece, Position } from "./PiecesAndPosition";

export class Bishop extends Piece {
  canMoveTo(newPosition: Position): boolean {
    const { file, rank } = newPosition.distanceFrom(this.position);
    if (Math.abs(file) === Math.abs(rank)) return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
