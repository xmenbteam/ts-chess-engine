import { FuncProps } from "../Types";
import { IsPieceInTheWay } from "../utils/movement-classes";
import { Piece, Position } from "./PiecesAndPosition";

export class Bishop extends Piece {
  canMoveTo(newPosition: Position, positions: string[]): boolean {
    const { file: fileDist, rank: rankDist } = newPosition.distanceFrom(
      this.position
    );

    const canMove = Math.abs(fileDist) === Math.abs(rankDist);

    const props: FuncProps = [
      this.position.getPosition(),
      newPosition.getPosition(),
      positions,
    ];

    const isInWay = new IsPieceInTheWay(...props).checkDiagonal();

    if (canMove && !isInWay) return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
