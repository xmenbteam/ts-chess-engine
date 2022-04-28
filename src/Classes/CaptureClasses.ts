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
    const isPawn = this.capturingPiece.constructor.name === "Pawn";
    const canCapture = file === 1 && Math.abs(rank) === 1;

    if (isPawn && canCapture && !this.isPieceSameColour()) return true;

    return false;
  }

  canEnPassant(): boolean {
    const { letterRef } = new utils().getLetterRefs();

    const capSquares = this.capturingPiece.getPreviousSquares();
    const targSquares = this.targetPiece.getPreviousSquares();

    const { file: capFile, rank: capRank } =
      this.capturingPiece.position.getPosition();
    const { file: targFile, rank: targRank } =
      this.targetPiece.position.getPosition();

    const maxFile = Math.max(letterRef[capFile], letterRef[targFile]);
    const minFile = Math.min(letterRef[capFile], letterRef[targFile]);

    const isParallel = capRank === targRank;
    const rightMoves = capSquares.length === 4 && targSquares.length === 2;
    const areNextToEachOther = maxFile - minFile === 1;
    const arePawns =
      this.capturingPiece.constructor.name === "Pawn" &&
      this.targetPiece.constructor.name === "Pawn";

    if (arePawns && isParallel && rightMoves && areNextToEachOther) return true;

    return false;
  }

  constructor(capturingPiece: Piece, targetPiece: Piece, positions: string[]) {
    this.capturingPiece = capturingPiece;
    this.targetPiece = targetPiece;
    this.positions = positions;
  }
}
