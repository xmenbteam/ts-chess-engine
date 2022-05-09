import { MoveToObj } from "../../Types";
import { Piece, Position } from "./PiecesAndPosition";

export class Pawn extends Piece {
  #hasMoved: boolean;
  #moveCount: number;

  get hasMoved() {
    return this.#hasMoved;
  }

  set hasMoved(hasMoved: boolean) {
    if (!this.hasMoved) this.#hasMoved = hasMoved;
  }

  get moveCount() {
    return this.#moveCount;
  }

  set moveCount(num: number) {
    this.#moveCount += num;
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

  moveTo(file: string, rank: number): MoveToObj {
    this.hasMoved = true;
    if (this.position.position.rank !== rank) this.moveCount = 1;
    this.position.position = { file, rank };
    return { hasMoved: this.hasMoved, moveCount: this.moveCount };
  }

  constructor(pieceColour: string, file: string, rank: number) {
    super(pieceColour, file, rank);
    this.#hasMoved = false;
    this.#moveCount = 0;
  }
}
