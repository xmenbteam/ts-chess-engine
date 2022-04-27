import { Piece, Position } from "./PiecesAndPosition";
import { FuncProps } from "../../Types";
import { IsPieceInTheWay } from "../MovementClasses/IsPieceInTheWay";
import { CanMoveToSquare } from "../MovementClasses/CanMoveToSquare";

export class Queen extends Piece {
  canMoveTo(newPosition: Position, positions: string[]): boolean {
    const distance = newPosition.distanceFrom(this.position);

    const props: FuncProps = [
      this.position.getPosition(),
      newPosition.getPosition(),
      positions,
    ];

    const canMove = new CanMoveToSquare(distance).queen();
    const isInWay = new IsPieceInTheWay(...props).checkBoth();

    if (canMove && !isInWay) return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
