import { Piece, Position } from "./PiecesAndPosition";

export class Error extends Piece {
  canMoveTo(newPosition: Position): boolean {
    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
