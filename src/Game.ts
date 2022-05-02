import { Bishop } from "./Classes/PieceClasses/Bishop";
import { King } from "./Classes/PieceClasses/King";
import { Knight } from "./Classes/PieceClasses/Knight";
import { Pawn } from "./Classes/PieceClasses/Pawn";
import { Piece, Position } from "./Classes/PieceClasses/PiecesAndPosition";
import { Queen } from "./Classes/PieceClasses/Queen";
import { Rook } from "./Classes/PieceClasses/Rook";
import { Colour, colourRef, CustomPieceArray, PieceObject } from "./Types";
import { SpecialMoves } from "./Classes/MovementClasses/SpecialMoves";
import { utils } from "./utils/utils";
import { Error } from "./Classes/PieceClasses/Error";
import { MovementUtils } from "./Classes/MovementClasses/MovementUtils";
import { Capture } from "./Classes/CaptureClasses";

export class Game {
  private turnCount: number;
  private pieces: { [key: string]: Piece };

  private static makePieces(): PieceObject {
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
      // else customPieces[`error${i}`] = new Error(Colour[colour], "z", 99 + i);
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
      const rankCheck = this.pieces[piece].position.position.rank === rank;
      const fileCheck = this.pieces[piece].position.position.file === file;
      if (fileCheck && rankCheck) return true;
    }
    return false;
  }

  getAllPositions(): string[] {
    return Object.values(this.getPieces()).reduce(
      (array: string[], piece: Piece) => {
        if (piece.isCaptured === false)
          array.push(
            `${piece.position.position.file}${piece.position.position.rank}`
          );
        return array;
      },
      []
    );
  }

  findKing(colour: number): Piece {
    const pieceArray = Object.values(this.getPieces());

    const king = pieceArray.filter((piece) => {
      return (
        piece.colour === Colour[colour] && piece.constructor.name === "King"
      );
    });

    return king[0];
  }

  getPiecesThatCanMove(pos: Position, move: string, colour: number): string[] {
    const pieceObj: { [key: string]: Piece } = this.getPieces();
    const pieceArray = Object.entries(pieceObj);

    if (this.isKingInCheck(colour)) {
      const { file, rank } = this.findKing(colour).position.position;
      return [`K${file}${rank}`];
    } else
      return pieceArray
        .filter(([piecePos, p]) => {
          const result = piecePos[0] === move[0];
          return result;
        })
        .reduce((array: string[], piece: [string, Piece]) => {
          const [piecePos, p] = piece;
          const m = p.canMoveTo(pos);
          const c = p.colour === Colour[colour];

          if (m && c) array.push(piecePos);
          return array;
        }, []);
  }

  capturePiece(
    capturePiece: Piece,
    targetPiece: Piece
  ): { [msg: string]: string } {
    const { flagRefObj } = new utils().getLetterRefs();
    const positions = this.getAllPositions();

    const { file: capFile, rank: capRank } = capturePiece.position.position;

    const { file, rank } = targetPiece.position.position;

    const pieceObj = this.getPieces();

    const name = capturePiece.constructor.name;
    const flag = flagRefObj[name];

    let canCapture: boolean;

    if (capturePiece.constructor.name === "Pawn")
      canCapture = new Capture(
        capturePiece,
        targetPiece,
        positions
      ).canPawnCapture();
    else
      canCapture = new Capture(
        capturePiece,
        targetPiece,
        positions
      ).canCapture();

    if (canCapture) {
      new MovementUtils().completeMove(pieceObj);
      targetPiece.isCaptured = true;

      return {
        msg: `${targetPiece.colour} ${targetPiece.constructor.name} on ${file}${rank} Captured!`,
      };
    }
    return { msg: "Could not capture!" };
  }

  isKingInCheck(colour: number): boolean {
    const pieceArray = Object.values(this.getPieces());
    let isInCheck: boolean = false;
    const positions = this.getAllPositions();

    pieceArray.forEach((piece) => {
      const canCapture = new Capture(
        piece,
        this.findKing(colour),
        positions
      ).canCapture();
      if (canCapture) isInCheck = true;
    });

    return isInCheck;
  }

  getSquaresKingCanMoveTo(colour: number) {
    const pieceObj: { [key: string]: Piece } = this.getPieces();
  }
  // isKingInCheckMate(colour: number): boolean {
  //   const king = this.findKing(colour);

  //   return false;
  // }

  makeMove(move: string, colour: number): { [msg: string]: string } {
    const { pawnTest } = new utils().getRegex();
    const pieceObj: PieceObject = this.getPieces();

    // THIS IS WHERE YOU CHECK IF THE PIECE CAN MOVE
    // GAME says this

    if (pawnTest.test(move)) move = `P${move}`;

    if (move === "0-0" || move === "0-0-0") {
      let side: number = 0;
      if (move === "0-0-0") side = 1;
      return new SpecialMoves(pieceObj).castle(side, colour, pieceObj);
    }
    // Can piece move here?
    const newPosition = new Position(move[1], Number(move[2]));
    const pieceThatCanMove = Object.values(pieceObj).reduce(
      (obj, piece): Piece => {
        if (piece.canMoveTo(newPosition)) obj = piece;
        return obj;
      }
    );

    try {
      const piece = new MovementUtils().completeMove(
        pieceObj,
        pieceThatCanMove,
        move
      );
      return { msg: `${piece} moved to ${move[1]}${move[2]}!` };
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
