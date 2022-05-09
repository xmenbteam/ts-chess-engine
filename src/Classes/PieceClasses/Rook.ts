import { Piece, Position } from "./PiecesAndPosition";

export class Rook extends Piece {
  #hasMoved: boolean;

  public get hasMoved(): boolean {
    return this.#hasMoved;
  }

  public set hasMoved(hasMoved) {
    this.#hasMoved = hasMoved;
  }

  canMoveTo(newPosition: Position): boolean {
    const { file, rank } = newPosition.distanceFrom(this.position);

    if (!file || !rank) return true;

    return false;
  }

  moveTo(file: string, rank: number) {
    this.position.position = { file, rank };
    this.hasMoved = true;
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
    this.#hasMoved = false;
  }
}
