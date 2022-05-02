import { Piece, Position } from "./PiecesAndPosition";

export class Queen extends Piece {
  canMoveTo(newPosition: Position): boolean {
    const { file, rank } = newPosition.distanceFrom(this.position);
    if (!file || !rank || Math.abs(file) === Math.abs(rank)) return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
