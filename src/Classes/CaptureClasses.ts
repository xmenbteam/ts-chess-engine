import { utils } from "../utils/utils";
import { Piece } from "./PieceClasses/PiecesAndPosition";

export class Capture {
  private capturingPiece: Piece;
  private targetPiece: Piece;

  isPieceSameColour(): boolean {
    const p1Colour = this.capturingPiece.colour;
    const p2Colour = this.targetPiece.colour;

    return p1Colour === p2Colour ? true : false;
  }

  canCapture(): boolean {
    const { file: targetFile, rank: targetRank } =
      this.targetPiece.position.position;

    const canMove = this.capturingPiece.canMoveTo(this.targetPiece.position);

    const isSameColour = this.isPieceSameColour();

    if (canMove && !isSameColour) return true;
    return false;
  }

  canPawnCapture(): boolean {
    const { file, rank } = this.targetPiece.position.distanceFrom(
      this.capturingPiece.position
    );
    const isPawn = this.capturingPiece.constructor.name === "Pawn";
    const canCapture = file === 1 && Math.abs(rank) === 1;

    if (isPawn && canCapture && !this.isPieceSameColour()) return true;

    return false;
  }

  canEnPassant(): boolean {
    const { letterRef } = new utils().getLetterRefs();
    const arePawns =
      this.capturingPiece.constructor.name === "Pawn" &&
      this.targetPiece.constructor.name === "Pawn";

    const { file: capFile, rank: capRank } =
      this.capturingPiece.position.position;
    const { file: targFile, rank: targRank } =
      this.targetPiece.position.position;

    const capCount = this.capturingPiece.moveTo(capFile, capRank)?.moveCount;
    const targCount = this.targetPiece.moveTo(targFile, targRank)?.moveCount;

    const isParallel = capRank === targRank;
    const rightMoves = capCount && capCount <= 3 && targCount === 1;
    const areNextToEachOther =
      Math.abs(letterRef[capFile] - letterRef[targFile]) === 1;

    if (arePawns && isParallel && rightMoves && areNextToEachOther) return true;

    return false;
  }

  constructor(capturingPiece: Piece, targetPiece: Piece) {
    this.capturingPiece = capturingPiece;
    this.targetPiece = targetPiece;
  }
}
