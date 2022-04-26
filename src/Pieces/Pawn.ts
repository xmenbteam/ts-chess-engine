import { FuncProps } from "../Types";
import { CanMoveToSquare, IsPieceInTheWay } from "../utils/MovClasses";
import { Piece, Position } from "./PiecesAndPosition";

export class Pawn extends Piece {
  canMoveTo(newPosition: Position, positions: string[]): boolean {
    const distance = newPosition.distanceFrom(this.position);

    const props: FuncProps = [
      this.position.getPosition(),
      newPosition.getPosition(),
      positions,
    ];

    const canMove = new CanMoveToSquare(distance).pawn(this.getHasMoved());
    const isInWay = new IsPieceInTheWay(...props).checkPawnMove();

    if (canMove && !isInWay) return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
