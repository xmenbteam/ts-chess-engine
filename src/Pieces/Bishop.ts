import { FuncProps } from "../Types";
import { CanMoveToSquare, IsPieceInTheWay } from "../utils/MovClasses";
import { Piece, Position } from "./PiecesAndPosition";

export class Bishop extends Piece {
  canMoveTo(newPosition: Position, positions: string[]): boolean {
    const distance = newPosition.distanceFrom(this.position);
    // console.log({ distance, newPosition }, "this.position", this.position);
    const props: FuncProps = [
      this.position.getPosition(),
      newPosition.getPosition(),
      positions,
    ];

    const canMove = new CanMoveToSquare(distance).bishop();
    const isInWay = new IsPieceInTheWay(...props).checkDiagonal();
    // console.log({ canMove, isInWay });

    if (canMove && !isInWay) return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
