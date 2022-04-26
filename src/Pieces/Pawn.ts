import { Piece, Position } from "./PiecesAndPosition";

export class Pawn extends Piece {
  canMoveTo(newPosition: Position, positions: string[]): boolean {
    const { file: fileDist, rank: rankDist } = newPosition.distanceFrom(
      this.position
    );
    const { file: pieceFile, rank: pieceRank } = this.position.getPosition();
    const { file: newFile, rank: newRank } = newPosition.getPosition();

    const ignoreYourself = positions.filter(
      (p) => p !== `${pieceFile}${pieceRank}`
    );

    const pieceInTheWay = ignoreYourself.includes(`${newFile}${newRank}`);

    const canMove =
      (!fileDist && Math.abs(rankDist) === 1) ||
      (!fileDist && Math.abs(rankDist) === 2 && !this.getHasMoved());

    if (canMove && !pieceInTheWay) return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
