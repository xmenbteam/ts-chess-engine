import { Bishop } from "./Classes/Pieces/Bishop";
import { King } from "./Classes/Pieces/King";
import { Knight } from "./Classes/Pieces/Knight";
import { Pawn } from "./Classes/Pieces/Pawn";
import { Piece, Position } from "./Classes/Pieces/PiecesAndPosition";
import { Queen } from "./Classes/Pieces/Queen";
import { Rook } from "./Classes/Pieces/Rook";
import { Colour, PieceObject } from "./Types";
import { SpecialMoves } from "./Classes/MovementClasses/SpecialMoves";
import { utils } from "./utils/utils";

export class Game {
  private turnCount: number;
  private pieces: { [key: string]: Piece };

  private static makePieces(): { [key: string]: Piece } {
    const pieces = {
      Pa2: new Pawn(Colour[0], "a", 2),
      Pb2: new Pawn(Colour[0], "b", 2),
      Pc2: new Pawn(Colour[0], "c", 2),
      Pd2: new Pawn(Colour[0], "d", 2),
      Pe2: new Pawn(Colour[0], "e", 2),
      Pf2: new Pawn(Colour[0], "f", 2),
      Pg2: new Pawn(Colour[0], "g", 2),
      Ph2: new Pawn(Colour[0], "h", 2),
      Ra1: new Rook(Colour[0], "a", 1),
      Nb1: new Knight(Colour[0], "b", 1),
      Bc1: new Bishop(Colour[0], "c", 1),
      Qd1: new Queen(Colour[0], "d", 1),
      Ke1: new King(Colour[0], "e", 1),
      Bf1: new Bishop(Colour[0], "f", 1),
      Ng1: new Knight(Colour[0], "g", 1),
      Rh1: new Rook(Colour[0], "h", 1),
      Pa7: new Pawn(Colour[1], "a", 7),
      Pb7: new Pawn(Colour[1], "b", 7),
      Pc7: new Pawn(Colour[1], "c", 7),
      Pd7: new Pawn(Colour[1], "d", 7),
      Pe7: new Pawn(Colour[1], "e", 7),
      Pf7: new Pawn(Colour[1], "f", 7),
      Pg7: new Pawn(Colour[1], "g", 7),
      Ph7: new Pawn(Colour[1], "h", 7),
      Ra8: new Rook(Colour[1], "a", 8),
      Nb8: new Knight(Colour[1], "b", 8),
      Bc8: new Bishop(Colour[1], "c", 8),
      Qd8: new Queen(Colour[1], "d", 8),
      Ke8: new King(Colour[1], "e", 8),
      Bf8: new Bishop(Colour[1], "f", 8),
      Ng8: new Knight(Colour[1], "g", 8),
      Rh8: new Rook(Colour[1], "h", 8),
    };
    return pieces;
  }
  getPieces(): { [key: string]: Piece } {
    return this.pieces;
  }

  getColourTurn(): string {
    return this.turnCount % 2 === 0 ? Colour[0] : Colour[1];
  }

  incTurnCount() {
    this.turnCount++;
  }

  isPieceThere(file: string, rank: number): boolean {
    for (let piece in this.pieces) {
      const rankCheck = this.pieces[piece].position.getPosition().rank === rank;
      const fileCheck = this.pieces[piece].position.getPosition().file === file;
      if (fileCheck && rankCheck) return true;
    }
    return false;
  }

  isPieceSameColour(pieceOne: Piece, pieceTwo: Piece): boolean {
    const p1Colour = pieceOne.getColour();
    const p2Colour = pieceTwo.getColour();

    return p1Colour === p2Colour ? true : false;
  }

  getAllPositions(): string[] {
    return Object.values(this.getPieces()).reduce(
      (array: string[], piece: Piece) => {
        array.push(
          `${piece.position.getPosition().file}${
            piece.position.getPosition().rank
          }`
        );
        return array;
      },
      []
    );
  }

  getPiecesThatCanMove(pos: Position, move: string, colour: number): string[] {
    const pieceObj: { [key: string]: Piece } = this.getPieces();
    const pieceArray = Object.entries(pieceObj);
    const positions = this.getAllPositions();

    return pieceArray
      .filter(([piecePos, p]) => {
        const result = piecePos[0] === move[0];
        return result;
      })
      .reduce((array: string[], piece: [string, Piece]) => {
        const [piecePos, p] = piece;
        const m = p.canMoveTo(pos, positions);
        const c = p.getColour() === Colour[colour];

        if (m && c) array.push(piecePos);
        return array;
      }, []);
  }

  makeMove(move: string, colour: number): { [msg: string]: string } {
    const { pawnTest, fileReg, rankReg } = new utils().getRegex();
    const pieceObj: PieceObject = this.getPieces();
    const positions: string[] = this.getAllPositions();
    let flag: string = "";

    if (pawnTest.test(move)) move = `P${move}`;

    if (move === "0-0" || move === "0-0-0") {
      let side: number = 0;
      if (move === "0-0-0") side = 1;
      return new SpecialMoves(pieceObj).castle(side, colour, positions);
    }

    const f: string = move.match(fileReg)![0];
    const r: string = move.match(rankReg)![0];
    const pos: Position = new Position(f, Number(r));

    const piecesThatCanMove: string[] = this.getPiecesThatCanMove(
      pos,
      move,
      colour
    );

    try {
      const piece = piecesThatCanMove[0];
      flag = piece[0];
      if (!pieceObj[piece].getHasMoved()) pieceObj[piece].setHasMoved();
      pieceObj[piece].position.setPosition(f, Number(r));
      pieceObj[`${flag}${f}${r}`] = pieceObj[piece];
      delete pieceObj[piece];

      return { msg: `${piece} moved to ${move}!` };
    } catch (err: any) {
      return { msg: "Fail!", err };
    }
  }

  constructor() {
    this.turnCount = 0;
    this.pieces = Game.makePieces();
  }
}
