import { Piece, Position } from "./PiecesAndPosition";

export class Rook extends Piece {
  private hasMoved: boolean = false;

  setHasMoved() {
    this.hasMoved = true;
  }

  getHasMoved() {
    return this.hasMoved;
  }

  canMoveTo(newPosition: Position): boolean {
    const { file, rank } = newPosition.distanceFrom(this.position);

    if (!file || !rank) return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
