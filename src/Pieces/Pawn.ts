import { Piece, Position } from "./PiecesAndPosition";

export class Pawn extends Piece {
  private hasMoved: boolean = false;

  getHasMoved() {
    return this.hasMoved;
  }

  setHasMoved() {
    this.hasMoved = true;
  }

  canMoveTo(newPosition: Position): boolean {
    const { file, rank } = newPosition.distanceFrom(this.position);
    if (!file && rank === 1) return true;
    if (!file && rank === 2 && !this.hasMoved) return true;
    if (Math.abs(file) === 1 && rank === 1) return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
