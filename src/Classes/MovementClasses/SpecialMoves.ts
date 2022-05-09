import { Position } from "../PieceClasses/PiecesAndPosition";
import { Colour, PieceObject, RankFile } from "../../Types";
import { IsPieceInTheWay } from "./IsPieceInTheWay";
import { utils } from "../../utils/utils";
import { MovementUtils } from "./MovementUtils";

export class SpecialMoves {
  static castle(side: number, colour: number, pieceObj: PieceObject) {
    const castleRefObj = utils.getCastleRef();

    const { oldKingCoord, oldRookCoord, newKingFile, newRookFile, rank } =
      castleRefObj;

    if (pieceObj[oldKingCoord[colour]].constructor.name !== "King")
      throw new Error("Not a King!");
    if (pieceObj[oldRookCoord[colour][side]].constructor.name !== "Rook")
      throw new Error("Not a Rook!");

    const king = pieceObj[oldKingCoord[colour]];
    const rook = pieceObj[oldRookCoord[colour][side]];

    const newKingPos: Position = new Position(newKingFile[side], rank[colour]);

    const newRookPos: Position = new Position(newRookFile[side], rank[colour]);

    const oldKingPos = pieceObj[oldKingCoord[colour]].position;
    const oldRookPos = pieceObj[oldRookCoord[colour][side]].position;

    const isPieceInWayKing = IsPieceInTheWay.checkRankAndFile(
      oldKingPos,
      newKingPos,
      pieceObj
    );

    const isPieceInWayRook = IsPieceInTheWay.checkRankAndFile(
      oldRookPos,
      newRookPos,
      pieceObj
    );

    const hasNotMoved = !king.hasMoved && !rook.hasMoved;

    try {
      if (hasNotMoved && !isPieceInWayKing && !isPieceInWayRook) {
        MovementUtils.completeCastle(king, colour, side, pieceObj);
        MovementUtils.completeCastle(rook, colour, side, pieceObj);

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
}
