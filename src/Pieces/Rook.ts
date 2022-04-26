import { FuncProps } from "../Types";
import { CanMoveToSquare, IsPieceInTheWay } from "../utils/MovClasses";
import { Piece, Position } from "./PiecesAndPosition";

export class Rook extends Piece {
  canMoveTo(newPosition: Position, positions: string[]): boolean {
    const distance = newPosition.distanceFrom(this.position);

    const props: FuncProps = [
      this.position.getPosition(),
      newPosition.getPosition(),
      positions,
    ];

    const canMove = new CanMoveToSquare(distance).rook();
    const isInWay = new IsPieceInTheWay(...props).checkRankAndFile();

    if (canMove && !isInWay) return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
