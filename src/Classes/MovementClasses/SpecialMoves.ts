import { Piece, Position } from "../PieceClasses/PiecesAndPosition";
import { Colour, PieceObject, RankFile } from "../../Types";
import { IsPieceInTheWay } from "./IsPieceInTheWay";
import { utils } from "../../utils/utils";
import { MovementUtils } from "./MovementUtils";

export class SpecialMoves {
  private pieces: PieceObject;

  castle(side: number, colour: number, pieceObj: PieceObject) {
    const castleRefObj = new utils().getCastleRef();
    const positions = Object.keys(pieceObj).map((pos) => `${pos[1]}${pos[2]}`);

    const { oldKingCoord, oldRookCoord, newKingFile, newRookFile, rank } =
      castleRefObj;

    if (pieceObj[oldKingCoord[colour]].constructor.name !== "King")
      throw new Error();
    if (pieceObj[oldRookCoord[colour][side]].constructor.name !== "Rook")
      throw new Error();

    const king = pieceObj[oldKingCoord[colour]];
    const rook = pieceObj[oldRookCoord[colour][side]];

    const newKingPos: Position = new Position(newKingFile[side], rank[colour]);

    const newRookPos: Position = new Position(newRookFile[side], rank[colour]);

    const oldKingPos = this.pieces[oldKingCoord[colour]].position.position;
    const oldRookPos =
      this.pieces[oldRookCoord[colour][side]].position.position;

    const isPieceInWayKing = new IsPieceInTheWay(
      oldKingPos,
      newKingPos,
      this.pieces
    ).checkRankAndFile();

    const isPieceInWayRook = new IsPieceInTheWay(
      oldRookPos,
      newRookPos,
      this.pieces
    ).checkRankAndFile();

    const hasNotMoved = !king.hasMoved && !rook.hasMoved;

    try {
      if (hasNotMoved && !isPieceInWayKing && !isPieceInWayRook) {
        new MovementUtils().completeCastle(king, colour, side, this.pieces);
        new MovementUtils().completeCastle(rook, colour, side, this.pieces);

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
