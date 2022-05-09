import { Piece, Position } from "./PiecesAndPosition";

export class King extends Piece {
  #hasMoved: boolean;

  get hasMoved(): boolean {
    return this.#hasMoved;
  }

  set hasMoved(hasMoved) {
    this.#hasMoved = hasMoved;
  }

  canMoveTo(newPosition: Position): boolean {
    const { rank, file } = newPosition.distanceFrom(this.position);
    if (
      (Math.abs(file) === 1 && Math.abs(rank) === 1) ||
      (Math.abs(file) === 1 && !rank) ||
      (!file && Math.abs(rank) === 1)
    )
      return true;

    return false;
  }

  moveTo(file: string, rank: number) {
    this.position.position = { file, rank };
    this.hasMoved = true;
    return { hasMoved: this.hasMoved };
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
    this.#hasMoved = false;
  }
}
