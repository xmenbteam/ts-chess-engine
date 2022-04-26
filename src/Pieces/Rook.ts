import { FuncProps } from "../Types";
import { IsPieceInTheWay } from "../utils/movement-classes";
import { Piece, Position } from "./PiecesAndPosition";

export class Rook extends Piece {
  canMoveTo(newPosition: Position, positions: string[]): boolean {
    const { file: fileDist, rank: rankDist } = newPosition.distanceFrom(
      this.position
    );
    const { file: pieceFile, rank: pieceRank } = this.position.getPosition();
    const { file: newFile, rank: newRank } = newPosition.getPosition();

    const canMove = !fileDist || !rankDist;

    const props: FuncProps = [
      pieceFile,
      pieceRank,
      newFile,
      newRank,
      positions,
    ];

    const isInWay = new IsPieceInTheWay(...props).checkRankAndFile();

    if (canMove && !isInWay) return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
