import { Bishop } from "./Pieces/Bishop";
import { King } from "./Pieces/King";
import { Knight } from "./Pieces/Knight";
import { Pawn } from "./Pieces/Pawn";
import { Piece } from "./Pieces/PiecesAndPosition";
import { Queen } from "./Pieces/Queen";
import { Rook } from "./Pieces/Rook";
import { Colour } from "./Types";

export class Game {
  private turnCount: number;
  private pieces: { [key: string]: Piece };

  private static makePieces(): { [key: string]: Piece } {
    const pieces = {
      pw1: new Pawn(Colour[0], "a", 2),
      pw2: new Pawn(Colour[0], "b", 2),
      pw3: new Pawn(Colour[0], "c", 2),
      pw4: new Pawn(Colour[0], "d", 2),
      pw5: new Pawn(Colour[0], "e", 2),
      pw6: new Pawn(Colour[0], "f", 2),
      pw7: new Pawn(Colour[0], "g", 2),
      pw8: new Pawn(Colour[0], "h", 2),
      Rw1: new Rook(Colour[0], "a", 1),
      Nw1: new Knight(Colour[0], "b", 1),
      Bw1: new Bishop(Colour[0], "c", 1),
      Qw: new Queen(Colour[0], "d", 1),
      Kw: new King(Colour[0], "e", 1),
      Bw2: new Bishop(Colour[0], "f", 1),
      Nw2: new Knight(Colour[0], "g", 1),
      Rw2: new Rook(Colour[0], "h", 1),
      pb1: new Pawn(Colour[1], "a", 7),
      pb2: new Pawn(Colour[1], "b", 7),
      pb3: new Pawn(Colour[1], "c", 7),
      pb4: new Pawn(Colour[1], "d", 7),
      pb5: new Pawn(Colour[1], "e", 7),
      pb6: new Pawn(Colour[1], "f", 7),
      pb7: new Pawn(Colour[1], "g", 7),
      pb8: new Pawn(Colour[1], "h", 7),
      Rb1: new Rook(Colour[1], "a", 8),
      Nb1: new Knight(Colour[1], "b", 8),
      Bb1: new Bishop(Colour[1], "c", 8),
      Qb: new Queen(Colour[1], "d", 8),
      Kb: new King(Colour[1], "e", 8),
      Bb2: new Bishop(Colour[1], "f", 8),
      Nb2: new Knight(Colour[1], "g", 8),
      Rb2: new Rook(Colour[1], "h", 8),
    };
    return pieces;
  }
  getPieces() {
    return this.pieces;
  }

  getColourTurn() {
    return this.turnCount % 2 === 0 ? Colour[0] : Colour[1];
  }

  incTurnCount() {
    this.turnCount++;
  }

  makeMove(move: string) {}

  constructor() {
    this.turnCount = 0;
    this.pieces = Game.makePieces();
  }
}
