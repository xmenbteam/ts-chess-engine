import { Piece, Position } from "./PiecesAndPosition";

export class Pawn extends Piece {
  hasMoved: boolean = false;

  setHasmoved() {
    this.hasMoved = true;
  }

  canMoveTo(newPosition: Position): boolean {
    const { file, rank } = newPosition.distanceFrom(this.position);
    if (!file && rank === 1) return true;
    if (!file && rank === 2 && !this.hasMoved) return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
