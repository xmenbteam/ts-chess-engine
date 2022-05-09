import { Bishop } from "./Classes/PieceClasses/Bishop";
import { King } from "./Classes/PieceClasses/King";
import { Knight } from "./Classes/PieceClasses/Knight";
import { Pawn } from "./Classes/PieceClasses/Pawn";
import { Piece, Position } from "./Classes/PieceClasses/PiecesAndPosition";
import { Queen } from "./Classes/PieceClasses/Queen";
import { Rook } from "./Classes/PieceClasses/Rook";
import {
  Colour,
  CustomPieceArray,
  PieceArray,
  PieceObject,
  RankFile,
} from "./Types";
import { SpecialMoves } from "./Classes/MovementClasses/SpecialMoves";
import { utils } from "./utils/utils";
import { MovementUtils } from "./Classes/MovementClasses/MovementUtils";
import { Capture } from "./Classes/CaptureClasses";
import { ErrorPiece } from "./Classes/PieceClasses/Error";
import { IsPieceInTheWay } from "./Classes/MovementClasses/IsPieceInTheWay";

export class Game {
  private _isWhiteMove: boolean;
  private _pieces: PieceObject;

  private static makePieces(): PieceObject {
    return {
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

  private static makeCustomPieces(pieces: CustomPieceArray): PieceObject {
    const { pawnTest, fileReg, rankReg, nameTest } = utils.getRegex();

    const customPieces: PieceObject = {};

    pieces.forEach(({ piece, colour }, i) => {
      const f: string = piece.match(fileReg)![0];
      const r: string = piece.match(rankReg)![0];

      if (pawnTest.test(piece)) piece = `P${piece}`;

      const n: string = piece.match(nameTest)![0];

      const posCheck = Object.keys(customPieces).map(
        (coord) => `${coord[1]}${coord[2]}`
      );

      if (!customPieces.hasOwnProperty(piece) && !posCheck.includes(`${f}${r}`))
        customPieces[piece] = Game.makeCustomPiece(n, colour, f, Number(r));
      else
        customPieces[`error${i}`] = new ErrorPiece(Colour[colour], "z", 99 + i);
    });

    return customPieces;
  }

  get pieces(): { [key: string]: Piece } {
    return this._pieces;
  }

  get isWhiteMove(): boolean {
    return this._isWhiteMove;
  }

  set isWhiteMove(value) {
    this._isWhiteMove = value;
  }

  makeMove(move: string, colour: number): { [msg: string]: string } {
    const { pawnTest, dubiousFile, dubiousRank } = utils.getRegex();

    if (pawnTest.test(move)) move = `P${move}`;

    if (move === "0-0" || move === "0-0-0") {
      let side: number = 0;
      if (move === "0-0-0") side = 1;
      return new SpecialMoves(this.pieces).castle(side, colour, this.pieces);
    }

    let destiPos: Position, destiRankFile: string, isPieceInWay: boolean;

    const isDubiousFile = dubiousFile.test(move);
    const isDubiousRank = dubiousRank.test(move);

    if (isDubiousFile || isDubiousRank) {
      destiPos = new Position(move[2], Number(move[3]));
      destiRankFile = `${move[2]}${move[3]}`;
    } else {
      destiPos = new Position(move[1], Number(move[2]));
      destiRankFile = `${move[1]}${move[2]}`;
    }

    const pieceThatCanMove: Piece = this.getPiece(destiPos, move, colour);

    if (
      pieceThatCanMove.constructor.name === "Knight" &&
      pieceThatCanMove.canMoveTo(destiPos)
    )
      isPieceInWay = false;
    else
      isPieceInWay = IsPieceInTheWay.checkBoth(
        pieceThatCanMove.position,
        destiPos,
        this.pieces
      );

    if (!isPieceInWay)
      try {
        const piece = MovementUtils.completeMove(
          this.pieces,
          pieceThatCanMove,
          destiPos,
          move
        );
        return { msg: `${piece} moved to ${destiRankFile}!` };
      } catch (err: any) {
        return { msg: "Fail!", err };
      }
    else return { msg: "Fail!" };
  }

  makeTurn(move: string) {
    const [white, black] = move.split(" ");

    return [this.makeMove(white, 0), this.makeMove(black, 1)];
  }

  isPieceThere(position: Position): boolean {
    const { rank, file } = position.position;

    for (let piece in this._pieces) {
      const rankCheck = this._pieces[piece].position.position.rank === rank;
      const fileCheck = this._pieces[piece].position.position.file === file;
      if (fileCheck && rankCheck) return true;
    }
    return false;
  }

  findKing(colour: number): Piece {
    const pieceArray = Object.values(this.pieces);

    const king = pieceArray.filter((piece) => {
      return (
        piece.colour === Colour[colour] && piece.constructor.name === "King"
      );
    });

    return king[0];
  }

  getPiece(positionMovingTo: Position, move: string, colour: number): Piece {
    const { dubiousFile, dubiousRank } = utils.getRegex();

    const pieceObj: { [key: string]: Piece } = this.pieces;
    const pieceArray: PieceArray = Object.entries(pieceObj);
    let match: boolean;

    let dubiousFileChar: string = "";
    let dubiousRankChar: string = "";

    if (dubiousFile.test(move)) {
      dubiousFileChar = move[1];
      move = `${move[0]}${move[2]}${move[3]}`;
    }

    if (dubiousRank.test(move)) {
      dubiousRankChar = move[1];
      move = `${move[0]}${move[2]}${move[3]}`;
    }

    const finalPiece = pieceArray.reduce(
      (object: any, piece: [string, Piece]) => {
        let [piecePos, p] = piece;
        const k = piecePos[0] === move[0];
        const m = p.canMoveTo(positionMovingTo);
        const c = p.colour === Colour[colour];

        if (dubiousFileChar) match = piecePos[1] === dubiousFileChar;
        if (dubiousRankChar) match = piecePos[2] === dubiousRankChar;

        if (dubiousFileChar || dubiousRankChar) {
          if (m && c && k && match) object = p;
        } else {
          if (m && c && k) object = p;
        }
        return object;
      },
      {}
    );

    return finalPiece;
  }

  capturePiece(
    capturePiece: Piece,
    targetPiece: Piece
  ): { [msg: string]: string } {
    const { flagRefObj } = utils.getLetterRefs();

    const { file: capFile, rank: capRank } = capturePiece.position.position;

    const { file, rank } = targetPiece.position.position;

    const pieceObj = this.pieces;

    const name = capturePiece.constructor.name;
    const flag = flagRefObj[name];

    let canCapture: boolean;

    if (capturePiece.constructor.name === "Pawn")
      canCapture = new Capture().canPawnCapture(capturePiece, targetPiece);
    else canCapture = new Capture().canCapture(capturePiece, targetPiece);

    if (canCapture) {
      MovementUtils.completeMove(
        pieceObj,
        capturePiece,
        targetPiece.position,
        `${flag}${capFile}${capRank}`
      );
      targetPiece.isCaptured = true;

      return {
        msg: `${targetPiece.colour} ${targetPiece.constructor.name} on ${file}${rank} Captured!`,
      };
    }
    return { msg: "Could not capture!" };
  }
  // 1. Is King in check?
  isKingInCheck(colour: number): boolean {
    let isInCheck: boolean = false;

    for (let piece in this.pieces) {
      const canCapture = new Capture().canCapture(
        this.pieces[piece],
        this.findKing(colour)
      );
      if (canCapture) isInCheck = true;
    }

    return isInCheck;
  }
  // 2. Can piece block the check?
  canPieceBlockCheck(colour: number): boolean {
    const king = this.findKing(colour);
    const isKingInCheck = this.isKingInCheck(colour);

    // const checkingPieces =

    return false;
  }
  // 3. Can the king move out of check?

  // 4. Can the checking piece be taken?

  isKingInCheckMate(colour: number): boolean {
    let isKingInCheckMate: boolean = false;
    const king = this.findKing(colour);
    const isKingInCheck = this.isKingInCheck(colour);
    let canKingMove: boolean = true;

    // If king moved to any of these squares, would it be in check?
    // const positionsKingCanMoveTo =
    // Find a way of looping through potential squares the king can move to
    // piece.canMoveTo(position)
    // If a king moved there, would it be in check?
    /*
    1. Check
    2. Can't block
    3. Can't move
    4. 
    */

    if (isKingInCheck && !canKingMove) isKingInCheckMate = true;

    return isKingInCheckMate;
  }

  constructor(pieces?: CustomPieceArray) {
    this._isWhiteMove = true;
    if (!pieces) this._pieces = Game.makePieces();
    else this._pieces = Game.makeCustomPieces(pieces);
  }
}
