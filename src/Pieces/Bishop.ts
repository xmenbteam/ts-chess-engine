import { FuncProps } from "../Types";
import { CanMoveToSquare, IsPieceInTheWay } from "../utils/movementClasses";
import { Piece, Position } from "./PiecesAndPosition";

export class Bishop extends Piece {
  canMoveTo(newPosition: Position, positions: string[]): boolean {
    const distance = newPosition.distanceFrom(this.position);

    const props: FuncProps = [
      this.position.getPosition(),
      newPosition.getPosition(),
      positions,
    ];

    const canMove = new CanMoveToSquare(distance).bishop();
    const isInWay = new IsPieceInTheWay(...props).checkDiagonal();

    if (canMove && !isInWay) return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
