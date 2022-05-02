import { PieceObject } from "../../Types";
import { utils } from "../../utils/utils";
import { King } from "../PieceClasses/King";
import { Piece, Position } from "../PieceClasses/PiecesAndPosition";
import { Rook } from "../PieceClasses/Rook";

export class MovementUtils {
  completeMove(pieceObj: PieceObject, pieceThatCanMove: Piece, move: string) {
    const HasMovedPieces = new utils().piecesThatNeedMoved();
    const pieceName = pieceThatCanMove.constructor.name;

    const piece = pieceObj[pieceStr];
    const flag = pieceStr[0];

    const { file: f, rank: r } = pieceThatCanMove.position.position;

    if (pieceName === "King" || pieceName === "Pawn" || pieceName === "Rook") {
      if (HasMovedPieces.includes(pieceName)) piece.hasMoved = true;
    }

    pieceObj[pieceStr].position.position = { file: f, rank: Number(r) };
    pieceObj[`${flag}${f}${r}`] = pieceObj[pieceStr];
    delete pieceObj[pieceStr];

    return piece;
  }

  completeCastle(
    piece: King | Rook,
    colour: number,
    side: number,
    pieces: PieceObject
  ) {
    const castleRefObj = new utils().getCastleRef();
    const { newKingFile, rank, oldKingCoord, newRookFile, oldRookCoord } =
      castleRefObj;

    piece.hasMoved = true;
    piece.position.position = { file: newKingFile[side], rank: rank[colour] };
    if (piece.constructor.name === "King") {
      pieces[`K${newKingFile[side]}${rank[colour]}`] = piece;
      delete pieces[oldKingCoord[colour]];
    }
    if (piece.constructor.name === "Rook") {
      pieces[`R${newRookFile[side]}${rank[colour]}`] = piece;
      delete pieces[oldRookCoord[side][colour]];
    }
  }
}
