import { PieceObject } from "../../Types";
import { utils } from "../../utils/utils";
import { King } from "../PieceClasses/King";
import { Piece } from "../PieceClasses/PiecesAndPosition";
import { Rook } from "../PieceClasses/Rook";

export class MovementUtils {
  completeMove(pieceObj: PieceObject, piece: Piece, move: string) {
    const flag = move[0];

    const { file: f, rank: r } = piece.position.position;

    piece.position.position = { file: f, rank: Number(r) };
    pieceObj[`${flag}${f}${r}`] = piece;
    delete pieceObj[`${flag}${f}${r}`];

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
