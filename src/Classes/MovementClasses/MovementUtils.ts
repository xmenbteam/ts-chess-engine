import { Game } from "../../Game";
import { PieceObject } from "../../Types";
import { utils } from "../../utils/utils";
import { Piece } from "../PieceClasses/PiecesAndPosition";

export class MovementUtils {
  completeMove(
    pieceObj: PieceObject,
    f: string,
    r: string,
    piecesThatCanMove: string[]
  ) {
    const piece = piecesThatCanMove[0];
    const flag = piece[0];
    if (!pieceObj[piece].getHasMoved()) pieceObj[piece].setHasMoved();
    pieceObj[piece].position.setPosition(f, Number(r));
    pieceObj[`${flag}${f}${r}`] = pieceObj[piece];
    delete pieceObj[piece];

    return piece;
  }

  completeCastle(
    piece: Piece,
    colour: number,
    side: number,
    pieces: PieceObject
  ) {
    const castleRefObj = new utils().getCastleRef();
    const { newKingFile, rank, oldKingCoord, newRookFile, oldRookCoord } =
      castleRefObj;

    piece.setHasMoved();
    piece.position.setPosition(newKingFile[side], rank[colour]);
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
