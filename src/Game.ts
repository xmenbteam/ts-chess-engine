import { Bishop } from "./Pieces/Bishop";
import { King } from "./Pieces/King";
import { Knight } from "./Pieces/Knight";
import { Pawn } from "./Pieces/Pawn";
import { Piece } from "./Pieces/PiecesAndPosition";
import { Queen } from "./Pieces/Queen";
import { Rook } from "./Pieces/Rook";
import { Colour } from "./Types";

export class Game {
  turnCount: number = 0;

  private static makePieces(): { [key: string]: Piece } {
    const pieces = {
      a2: new Pawn(Colour[0], "a", 2),
      b2: new Pawn(Colour[0], "b", 2),
      c2: new Pawn(Colour[0], "c", 2),
      d2: new Pawn(Colour[0], "d", 2),
      e2: new Pawn(Colour[0], "e", 2),
      f2: new Pawn(Colour[0], "f", 2),
      g2: new Pawn(Colour[0], "g", 2),
      Rw1: new Rook(Colour[0], "a", 1),
      Nw1: new Knight(Colour[0], "b", 1),
      Bw1: new Bishop(Colour[0], "c", 1),
      Qw: new Queen(Colour[0], "d", 1),
      Kw: new King(Colour[0], "e", 1),
      Bw2: new Bishop(Colour[0], "f", 1),
      Nw2: new Knight(Colour[0], "g", 1),
      Rw2: new Rook(Colour[0], "h", 1),
      a7: new Pawn(Colour[1], "a", 7),
      b7: new Pawn(Colour[1], "b", 7),
      c7: new Pawn(Colour[1], "c", 7),
      d7: new Pawn(Colour[1], "d", 7),
      e7: new Pawn(Colour[1], "e", 7),
      f7: new Pawn(Colour[1], "f", 7),
      g7: new Pawn(Colour[1], "g", 7),
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
}
