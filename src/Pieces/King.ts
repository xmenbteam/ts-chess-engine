import { FuncProps } from "../Types";
import { IsPieceInTheWay } from "../utils/movement-classes";
import { Piece, Position } from "./PiecesAndPosition";

export class King extends Piece {
  canMoveTo(newPosition: Position, positions: string[]): boolean {
    const { file: fileDist, rank: rankDist } = newPosition.distanceFrom(
      this.position
    );

    const { file: pieceFile, rank: pieceRank } = this.position.getPosition();
    const { file: newFile, rank: newRank } = newPosition.getPosition();

    const canMove =
      (Math.abs(fileDist) === 1 && Math.abs(rankDist) === 1) ||
      (Math.abs(fileDist) === 1 && !Math.abs(rankDist)) ||
      (!Math.abs(fileDist) && Math.abs(rankDist) === 1);

    const props: FuncProps = [
      pieceFile,
      pieceRank,
      newFile,
      newRank,
      positions,
    ];

    const isInWay = new IsPieceInTheWay(...props).checkKingMove();

    if (canMove && !isInWay) return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
