import { Piece, Position } from "./PiecesAndPosition";

export class King extends Piece {
  canMoveTo(newPosition: Position): boolean {
    const { file, rank } = newPosition.distanceFrom(this.position);
    if (Math.abs(file) === 1 && Math.abs(rank) === 1) return true;
    if (Math.abs(file) === 1 && !Math.abs(rank)) return true;
    if (!Math.abs(file) && Math.abs(rank) === 1) return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
