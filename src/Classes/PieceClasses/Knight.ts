import { Piece, Position } from "./PiecesAndPosition";

export class Knight extends Piece {
  private _hasMoved: boolean;

  public get hasMoved() {
    return this._hasMoved;
  }

  public set hasMoved(hasMoved) {
    this._hasMoved = hasMoved;
  }
  canMoveTo(newPosition: Position): boolean {
    const { file, rank } = newPosition.distanceFrom(this.position);
    if (
      (Math.abs(file) === 2 && Math.abs(rank) === 1) ||
      (Math.abs(file) === 1 && Math.abs(rank) === 2)
    )
      return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
    this._hasMoved = false;
  }
}
