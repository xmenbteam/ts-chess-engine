import { Piece, Position } from "./PiecesAndPosition";

export class King extends Piece {
  private _hasMoved: boolean;

  public get hasMoved(): boolean {
    return this._hasMoved;
  }

  public set hasMoved(hasMoved) {
    this._hasMoved = hasMoved;
  }
  canMoveTo(newPosition: Position): boolean {
    const { rank, file } = newPosition.distanceFrom(this.position);
    if (
      (Math.abs(file) === 1 && Math.abs(rank) === 1) ||
      (Math.abs(file) === 1 && !Math.abs(rank)) ||
      (!Math.abs(file) && Math.abs(rank) === 1)
    )
      return true;

    return false;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
    this._hasMoved = false;
  }
}
