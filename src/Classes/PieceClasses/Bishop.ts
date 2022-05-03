import { Piece, Position } from "./PiecesAndPosition";

export class Bishop extends Piece {
  canMoveTo(newPosition: Position): boolean {
    const { rank, file } = newPosition.distanceFrom(this.position);

    if (Math.abs(file) === Math.abs(rank)) return true;

    return false;
  }

  moveTo(file: string, rank: number) {
    this.position.position = { file, rank };
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
