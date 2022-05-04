import { utils } from "../utils/utils";
import { Piece } from "./PieceClasses/PiecesAndPosition";

export class Capture {
  isPieceSameColour(capturingPiece: Piece, targetPiece: Piece): boolean {
    const p1Colour = capturingPiece.colour;
    const p2Colour = targetPiece.colour;

    return p1Colour === p2Colour ? true : false;
  }

  canCapture(capturingPiece: Piece, targetPiece: Piece): boolean {
    const canMove = capturingPiece.canMoveTo(targetPiece.position);

    const isSameColour = this.isPieceSameColour(capturingPiece, targetPiece);

    if (canMove && !isSameColour) return true;
    return false;
  }

  canPawnCapture(capturingPiece: Piece, targetPiece: Piece): boolean {
    const { file, rank } = targetPiece.position.distanceFrom(
      capturingPiece.position
    );
    const isPawn = capturingPiece.constructor.name === "Pawn";
    const canCapture = file === 1 && Math.abs(rank) === 1;

    if (
      isPawn &&
      canCapture &&
      !this.isPieceSameColour(capturingPiece, targetPiece)
    )
      return true;

    return false;
  }

  canEnPassant(capturingPiece: Piece, targetPiece: Piece): boolean {
    const { letterRef } = new utils().getLetterRefs();
    const arePawns =
      capturingPiece.constructor.name === "Pawn" &&
      targetPiece.constructor.name === "Pawn";

    const { file: capFile, rank: capRank } = capturingPiece.position.position;
    const { file: targFile, rank: targRank } = targetPiece.position.position;

    const capCount = capturingPiece.moveTo(capFile, capRank)?.moveCount;
    const targCount = targetPiece.moveTo(targFile, targRank)?.moveCount;

    const isParallel = capRank === targRank;
    const rightMoves = capCount && capCount <= 3 && targCount === 1;
    const areNextToEachOther =
      Math.abs(letterRef[capFile] - letterRef[targFile]) === 1;

    if (arePawns && isParallel && rightMoves && areNextToEachOther) return true;

    return false;
  }
}