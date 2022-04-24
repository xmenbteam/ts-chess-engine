import { Bishop } from "./Pieces/Bishop";
import { King } from "./Pieces/King";
import { Knight } from "./Pieces/Knight";
import { Pawn } from "./Pieces/Pawn";
import { Piece, Position } from "./Pieces/PiecesAndPosition";
import { Queen } from "./Pieces/Queen";
import { Rook } from "./Pieces/Rook";
import { Colour, RankFile } from "./Types";
import {
  fileReg,
  files,
  letterRef,
  pawnTest,
  pieceTest,
  rankRej,
} from "./utils/utils";

export class Game {
  private turnCount: number;
  private pieces: { [key: string]: Piece };

  private static makePieces(): { [key: string]: Piece } {
    const pieces = {
      a2: new Pawn(Colour[0], "a", 2),
      b2: new Pawn(Colour[0], "b", 2),
      c2: new Pawn(Colour[0], "c", 2),
      d2: new Pawn(Colour[0], "d", 2),
      e2: new Pawn(Colour[0], "e", 2),
      f2: new Pawn(Colour[0], "f", 2),
      g2: new Pawn(Colour[0], "g", 2),
      h2: new Pawn(Colour[0], "h", 2),
      Ra1: new Rook(Colour[0], "a", 1),
      Nb1: new Knight(Colour[0], "b", 1),
      Bc1: new Bishop(Colour[0], "c", 1),
      Qd1: new Queen(Colour[0], "d", 1),
      Ke1: new King(Colour[0], "e", 1),
      Bf1: new Bishop(Colour[0], "f", 1),
      Ng1: new Knight(Colour[0], "g", 1),
      Rh1: new Rook(Colour[0], "h", 1),
      a7: new Pawn(Colour[1], "a", 7),
      b7: new Pawn(Colour[1], "b", 7),
      c7: new Pawn(Colour[1], "c", 7),
      d7: new Pawn(Colour[1], "d", 7),
      e7: new Pawn(Colour[1], "e", 7),
      f7: new Pawn(Colour[1], "f", 7),
      g7: new Pawn(Colour[1], "g", 7),
      h7: new Pawn(Colour[1], "h", 7),
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

  isPieceInTheWay(piece: Piece, newPosition: Position): boolean {
    if (piece.constructor.name === "Knight") return false;

    const { file: newFile, rank: newRank }: RankFile =
      newPosition.getPosition();
    const { file: pieceFile, rank: pieceRank }: RankFile =
      piece.position.getPosition();

    const allPieces: string[] = this.getAllPositions();
    const piecePosition: string = `${pieceFile}${pieceRank}`;

    const minRank: number = Math.min(pieceRank, newRank);
    const maxRank: number = Math.max(pieceRank, newRank);

    const minFile: number = Math.min(letterRef[pieceFile], letterRef[newFile]);
    const maxFile: number = Math.max(letterRef[pieceFile], letterRef[newFile]);

    const positions: string[] = [];

    for (let i = minFile; i <= maxFile; i++) {
      const fileRank = `${files[i]}${minRank}`;
      positions.push(fileRank);
    }
    for (let i = minRank - 1; i < maxRank; i++) {
      if (!positions[i]) positions[i] = positions[0][0];
      positions[i] = `${positions[i][0]}${(i + 1).toString()}`;
    }

    const notStartingSquare: string[] = positions.filter(
      (position) => position !== piecePosition
    );

    for (let i = 0; i < notStartingSquare.length; i++)
      if (allPieces.includes(notStartingSquare[i])) return true;
    return false;
  }

  makeMove(move: string): void {
    const moveArray: string[] = move.split(" ");
    const pieceObj: { [key: string]: Piece } = this.getPieces();
    let flag: string = "";
    moveArray.forEach((move, i) => {
      const f: string = move.match(fileReg)![0];
      const r: string = move.match(rankRej)![0];
      const pos: Position = new Position(f, Number(r));
      for (let piece in pieceObj) {
        if (
          pieceObj[piece].canMoveTo(pos) &&
          pieceObj[piece].getColour() === Colour[i] &&
          !this.isPieceInTheWay(pieceObj[piece], pos) &&
          piece[0] === move[0]
        ) {
          if (pieceTest.test(piece)) flag = piece[0];
          if (!pieceObj[piece].getHasMoved()) pieceObj[piece].setHasMoved();
          pieceObj[piece].position.setPosition(f, Number(r));
          pieceObj[`${flag}${f}${r}`] = pieceObj[piece];
          delete pieceObj[piece];
        }
      }
    });
  }

  constructor() {
    this.turnCount = 0;
    this.pieces = Game.makePieces();
  }
}
