import { Piece, Position } from "./PiecesAndPosition";

export class ErrorPiece extends Piece {
  canMoveTo(newPosition: Position): boolean {
    return false;
  }

  moveTo(file: string, rank: number) {
    this.position.position = { file, rank };
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
