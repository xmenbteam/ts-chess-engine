import { utils } from "../utils/utils";
import { Piece } from "./PieceClasses/PiecesAndPosition";

export class Capture {
  private capturingPiece: Piece;
  private targetPiece: Piece;
  private positions: string[];

  isPieceSameColour(): boolean {
    const p1Colour = this.capturingPiece.getColour();
    const p2Colour = this.targetPiece.getColour();

    return p1Colour === p2Colour ? true : false;
  }

  canCapture(): boolean {
    const { file: targetFile, rank: targetRank } =
      this.targetPiece.position.getPosition();

    const notYou = this.positions.filter(
      (pos) => pos !== `${targetFile}${targetRank}`
    );

    const canMove = this.capturingPiece.canMoveTo(
      this.targetPiece.position,
      notYou
    );

    const isSameColour = this.isPieceSameColour();

    if (canMove && !isSameColour) return true;
    return false;
  }

  canPawnCapture(): boolean {
    const { file, rank } = this.targetPiece.position.distanceFrom(
      this.capturingPiece.position
    );

    const canCapture = file === 1 && Math.abs(rank) === 1;

    if (canCapture && !this.isPieceSameColour()) return true;

    return false;
  }

  constructor(capturingPiece: Piece, targetPiece: Piece, positions: string[]) {
    this.capturingPiece = capturingPiece;
    this.targetPiece = targetPiece;
    this.positions = positions;
  }
}
