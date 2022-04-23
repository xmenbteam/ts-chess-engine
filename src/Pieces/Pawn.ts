import { Piece, Position } from "./PiecesAndPosition";

export class Pawn extends Piece {
  canMoveTo(newPosition: Position): boolean {
    const { file, rank } = newPosition.distanceFrom(this.position);
    if (!file && Math.abs(rank) === 1) return true;
    if (!file && Math.abs(rank) === 2 && !this.getHasMoved()) return true;
    if (Math.abs(file) === 1 && rank === 1) return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
