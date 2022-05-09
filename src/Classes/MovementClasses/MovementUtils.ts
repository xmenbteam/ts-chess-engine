import { PieceObject } from "../../Types";
import { utils } from "../../utils/utils";
import { King } from "../PieceClasses/King";
import { Piece, Position } from "../PieceClasses/PiecesAndPosition";
import { Rook } from "../PieceClasses/Rook";

export class MovementUtils {
  static completeMove(
    pieceObj: PieceObject,
    piece: Piece,
    destiPos: Position,
    move: string
  ) {
    const flag = move[0];

    const { file: f, rank: r } = piece.position.position;

    const { file: newF, rank: newR } = destiPos.position;

    piece.position.position = { file: newF, rank: Number(newR) };

    const newKey = `${flag}${newF}${newR}`;
    pieceObj[newKey] = piece;

    delete pieceObj[`${flag}${f}${r}`];

    return piece.constructor.name;
  }

  static completeCastle(
    piece: King | Rook,
    colour: number,
    side: number,
    pieces: PieceObject
  ) {
    const castleRefObj = utils.getCastleRef();
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
