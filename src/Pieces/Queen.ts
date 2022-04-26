import { Piece, Position } from "./PiecesAndPosition";
import { FuncProps } from "../Types";
import { IsPieceInTheWay } from "../utils/movement-classes";

export class Queen extends Piece {
  canMoveTo(newPosition: Position, positions: string[]): boolean {
    const { file: fileDist, rank: rankDist } = newPosition.distanceFrom(
      this.position
    );
    const { file: pieceFile, rank: pieceRank } = this.position.getPosition();
    const { file: newFile, rank: newRank } = newPosition.getPosition();

    const canMove =
      !fileDist || !rankDist || Math.abs(fileDist) === Math.abs(rankDist);

    const props: FuncProps = [
      pieceFile,
      pieceRank,
      newFile,
      newRank,
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
