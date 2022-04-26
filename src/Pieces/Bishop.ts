import { FuncProps } from "../Types";
import { diagonalInTheWay } from "../utils/movement-funcs";
import { files, letterRef } from "../utils/utils";
import { Piece, Position } from "./PiecesAndPosition";

export class Bishop extends Piece {
  canMoveTo(newPosition: Position, positions: string[]): boolean {
    const { file: fileDist, rank: rankDist } = newPosition.distanceFrom(
      this.position
    );
    const { file: pieceFile, rank: pieceRank } = this.position.getPosition();
    const { file: newFile, rank: newRank } = newPosition.getPosition();

    const canMove = Math.abs(fileDist) === Math.abs(rankDist);

    const props: FuncProps = [
      pieceFile,
      pieceRank,
      newFile,
      newRank,
      positions,
    ];

    const isInWay = diagonalInTheWay(...props);

    if (canMove && !isInWay) return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
