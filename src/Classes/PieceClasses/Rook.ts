import { Piece, Position } from "./PiecesAndPosition";

export class Rook extends Piece {
  private _hasMoved: boolean;

  public get hasMoved(): boolean {
    return this._hasMoved;
  }

  public set hasMoved(hasMoved) {
    this._hasMoved = hasMoved;
  }

  canMoveTo(newPosition: Position): boolean {
    const { file, rank } = newPosition.distanceFrom(this.position);

    if (!file || !rank) return true;

    return false;
  }

  moveTo(file: string, rank: number) {
    this.position.position = { file, rank };
    this.hasMoved = true;
    return { hasMoved: this.hasMoved };
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
    this._hasMoved = false;
  }
}
