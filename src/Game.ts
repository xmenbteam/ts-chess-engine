import { Bishop } from "./Classes/PieceClasses/Bishop";
import { King } from "./Classes/PieceClasses/King";
import { Knight } from "./Classes/PieceClasses/Knight";
import { Pawn } from "./Classes/PieceClasses/Pawn";
import { Piece, Position } from "./Classes/PieceClasses/PiecesAndPosition";
import { Queen } from "./Classes/PieceClasses/Queen";
import { Rook } from "./Classes/PieceClasses/Rook";
import { Colour, CustomPieceArray, PieceObject } from "./Types";
import { SpecialMoves } from "./Classes/MovementClasses/SpecialMoves";
import { utils } from "./utils/utils";
import { Error } from "./Classes/PieceClasses/Error";

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
  private static makeCustomPieces(pieces: CustomPieceArray): {
    [key: string]: Piece;
  } {
    const { pawnTest, fileReg, rankReg, nameTest } = new utils().getRegex();

    const customPieces: PieceObject = {};

    pieces.forEach(({ piece, colour }, i) => {
      const f: string = piece.match(fileReg)![0];
      const r: string = piece.match(rankReg)![0];

      if (pawnTest.test(piece)) piece = <string>`P${piece}`;

      const n: string = piece.match(nameTest)![0];

      const posCheck = Object.keys(customPieces).map(
        (coord) => `${coord[1]}${coord[2]}`
      );

      if (!customPieces.hasOwnProperty(piece) && !posCheck.includes(`${f}${r}`))
        customPieces[piece] = Game.makeCustomPiece(n, colour, f, Number(r));
      else customPieces[`error${i}`] = new Error(Colour[colour], "z", 99 + i);
    });

    return customPieces;
  }

  private static makeCustomPiece(
    name: string,
    colour: number,
    f: string,
    r: number
  ): Piece {
    const ref: { [key: string]: Piece } = {
      P: new Pawn(Colour[colour], f, r),
      R: new Rook(Colour[colour], f, r),
      N: new Knight(Colour[colour], f, r),
      Q: new Queen(Colour[colour], f, r),
      K: new King(Colour[colour], f, r),
      B: new Bishop(Colour[colour], f, r),
    };

    return ref[name];
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

      return { msg: `${piece} moved to ${f}${r}!` };
    } catch (err: any) {
      return { msg: "Fail!", err };
    }
  }

  makeTurn(move: string) {
    const [white, black] = move.split(" ");

    return [this.makeMove(white, 0), this.makeMove(black, 1)];
  }

  constructor(pieces?: CustomPieceArray) {
    this.turnCount = 0;
    if (!pieces) this.pieces = Game.makePieces();
    else this.pieces = Game.makeCustomPieces(pieces);
  }
}
