import { Piece, Position } from "./PiecesAndPosition";
import { FuncProps } from "../Types";
import { IsPieceInTheWay } from "../utils/movement-classes";

export class Queen extends Piece {
  canMoveTo(newPosition: Position, positions: string[]): boolean {
    const { file: fileDist, rank: rankDist } = newPosition.distanceFrom(
      this.position
    );

    const canMove =
      !fileDist || !rankDist || Math.abs(fileDist) === Math.abs(rankDist);

    const props: FuncProps = [
      this.position.getPosition(),
      newPosition.getPosition(),
      positions,
    ];

    const isInWay = new IsPieceInTheWay(...props).checkBoth();

    if (canMove && !isInWay) return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
