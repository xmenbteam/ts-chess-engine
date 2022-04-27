import { RankFileDist } from "../../Types";

export class CanMoveToSquare {
  private canMove: boolean;
  private distance: RankFileDist;

  queen() {
    const { file, rank } = this.distance;

    if (!file || !rank || Math.abs(file) === Math.abs(rank))
      this.canMove = true;
    return this.canMove;
  }

  bishop() {
    const { file, rank } = this.distance;
    if (Math.abs(file) === Math.abs(rank)) this.canMove = true;
    return this.canMove;
  }

  king() {
    const { file, rank } = this.distance;
    if (
      (Math.abs(file) === 1 && Math.abs(rank) === 1) ||
      (Math.abs(file) === 1 && !Math.abs(rank)) ||
      (!Math.abs(file) && Math.abs(rank) === 1)
    )
      this.canMove = true;

    return this.canMove;
  }

  knight() {
    const { file, rank } = this.distance;
    if (
      (Math.abs(file) === 2 && Math.abs(rank) === 1) ||
      (Math.abs(file) === 1 && Math.abs(rank) === 2)
    )
      this.canMove = true;

    return this.canMove;
  }

  pawn(hasMoved: boolean) {
    const { file, rank } = this.distance;
    if (
      (!file && Math.abs(rank) === 1) ||
      (!file && Math.abs(rank) === 2 && !hasMoved)
    )
      this.canMove = true;

    return this.canMove;
  }

  rook() {
    const { file, rank } = this.distance;

    if (!file || !rank) this.canMove = true;

    return this.canMove;
  }

  constructor(distance: RankFileDist) {
    this.canMove = false;
    this.distance = distance;
  }
}
