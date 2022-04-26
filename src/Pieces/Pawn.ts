import { FuncProps } from "../Types";
import { IsPieceInTheWay } from "../utils/movement-classes";
import { Piece, Position } from "./PiecesAndPosition";

export class Pawn extends Piece {
  canMoveTo(newPosition: Position, positions: string[]): boolean {
    const { file: fileDist, rank: rankDist } = newPosition.distanceFrom(
      this.position
    );

    const canMove =
      (!fileDist && Math.abs(rankDist) === 1) ||
      (!fileDist && Math.abs(rankDist) === 2 && !this.getHasMoved());

    const props: FuncProps = [
      this.position.getPosition(),
      newPosition.getPosition(),
      positions,
    ];

    const isInWay = new IsPieceInTheWay(...props).checkPawnMove();

    if (canMove && !isInWay) return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
