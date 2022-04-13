import { Piece } from "./Pieces";

export class Pawn extends Piece {
  hasMoved: boolean = false;

  setHasmoved() {
    this.hasMoved = true;
  }

  canMoveTo(): Array<{ file: string; rank: number }> {
    const currentPosition = this.position.getPosition();

    if (this.hasMoved)
      return [{ file: currentPosition.file, rank: currentPosition.rank + 1 }];
    else
      return [
        { file: currentPosition.file, rank: currentPosition.rank + 1 },
        { file: currentPosition.file, rank: currentPosition.rank + 2 },
      ];
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
  }
}
