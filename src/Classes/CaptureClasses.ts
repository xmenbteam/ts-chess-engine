import { Piece } from "./PieceClasses/PiecesAndPosition";

export class Capture {
  private pieceOne: Piece;
  private pieceTwo: Piece;
  private positions: string[];

  canCapture() {}

  constructor(pieceOne: Piece, pieceTwo: Piece, positions: string[]) {
    this.pieceOne = pieceOne;
    this.pieceTwo = pieceTwo;
    this.positions = positions;
  }
}
