import { CanMoveToSquare } from "../utils/movementClasses";
import { Piece, Position } from "./PiecesAndPosition";

export class Knight extends Piece {
  canMoveTo(newPosition: Position, positions: string[]): boolean {
    const distance = newPosition.distanceFrom(this.position);
    const canMove = new CanMoveToSquare(distance).knight();

    return canMove;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
