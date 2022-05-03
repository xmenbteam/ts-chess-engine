import { Piece, Position } from "./PiecesAndPosition";

export class Pawn extends Piece {
  private _hasMoved: boolean;
  private _moveCount: number;

  public get hasMoved() {
    return this._hasMoved;
  }

  public set hasMoved(hasMoved: boolean) {
    if (!this.hasMoved) this._hasMoved = hasMoved;
  }

  public get moveCount() {
    return this._moveCount;
  }

  public set moveCount(num: number) {
    this._moveCount += num;
  }

  canMoveTo(newPosition: Position): boolean {
    const { file, rank } = newPosition.distanceFrom(this.position);

    if (
      (!file && Math.abs(rank) === 1) ||
      (!file && Math.abs(rank) === 2 && !this.hasMoved)
    )
      return true;
    return false;
  }

  moveTo(file: string, rank: number) {
    this.hasMoved = true;
    if (this.position.position.rank !== rank) this.moveCount = 1;
    this.position.position = { file, rank };
    return { hasMoved: this.hasMoved, moveCount: this.moveCount };
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
    this._hasMoved = false;
    this._moveCount = 0;
  }
}
