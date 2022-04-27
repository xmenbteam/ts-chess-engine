import { Position } from "../Pieces/PiecesAndPosition";
import { Colour, PieceObject } from "../../Types";
import { IsPieceInTheWay } from "./IsPieceInTheWay";
import { castleRefObj } from "../../utils/utils";

export class SpecialMoves {
  private pieces: PieceObject;

  castle(side: number, colour: number, positions: string[]) {
    const { oldKingCoord, oldRookCoord, newKingFile, newRookFile, rank } =
      castleRefObj;

    const newKingPos = new Position(
      newKingFile[side],
      rank[colour]
    ).getPosition();
    const newRookPos = new Position(
      newRookFile[side],
      rank[colour]
    ).getPosition();
    const oldKingPos = this.pieces[oldKingCoord[colour]].position.getPosition();
    const oldRookPos =
      this.pieces[oldRookCoord[colour][side]].position.getPosition();

    const isPieceInWayKing = new IsPieceInTheWay(
      oldKingPos,
      newKingPos,
      positions
    ).checkRankAndFile();

    const isPieceInWayRook = new IsPieceInTheWay(
      oldRookPos,
      newRookPos,
      positions
    ).checkRankAndFile();

    const hasNotMoved =
      !this.pieces[oldKingCoord[colour]].getHasMoved() &&
      !this.pieces[oldRookCoord[colour][side]].getHasMoved();

    const king = this.pieces[oldKingCoord[colour]];
    const rook = this.pieces[oldRookCoord[colour][side]];

    try {
      if (hasNotMoved && !isPieceInWayKing && !isPieceInWayRook) {
        king.setHasMoved();
        king.position.setPosition(newKingFile[side], rank[colour]);
        this.pieces[`K${newKingFile[side]}${rank[colour]}`] = king;
        delete this.pieces[oldKingCoord[colour]];

        rook.setHasMoved();
        rook.position.setPosition(newRookFile[side], rank[colour]);
        this.pieces[`R${newRookFile[side]}${rank[colour]}`] = rook;
        delete this.pieces[oldRookCoord[colour][side]];
        return {
          msg: `${Colour[colour]} castled ${side ? "Queen" : "King"}side!`,
        };
      } else
        return {
          msg: `${Colour[colour]} Failed to castle ${
            side ? "Queen" : "King"
          }side!`,
        };
    } catch (err) {
      console.log("CASTLING", err);
      return { msg: "ERROR" };
    }
  }

  constructor(pieces: PieceObject) {
    this.pieces = pieces;
  }
}
