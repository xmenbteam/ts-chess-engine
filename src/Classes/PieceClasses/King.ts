import { FuncProps } from "../../Types";
import { CanMoveToSquare } from "../MovementClasses/CanMoveToSquare";
import { IsPieceInTheWay } from "../MovementClasses/IsPieceInTheWay";
import { Piece, Position } from "./PiecesAndPosition";

export class King extends Piece {
  canMoveTo(newPosition: Position, positions: string[]): boolean {
    const distance = newPosition.distanceFrom(this.position);

    const props: FuncProps = [
      this.position.getPosition(),
      newPosition.getPosition(),
      positions,
    ];

    const canMove = new CanMoveToSquare(distance).king();
    const isInWay = new IsPieceInTheWay(...props).checkKingMove();

    if (canMove && !isInWay) return true;

    return false;
  }

  isInCheck() {}

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
