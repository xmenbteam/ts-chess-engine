import { PositionDiff } from "../Types";
import { letterRef } from "../utils/utils";

export class Position {
  private file: string;
  private rank: number;

  distanceFrom(otherPosition: Position): PositionDiff {
    const fileDiff = letterRef[this.file] - letterRef[otherPosition.file];
    const rankDiff = this.rank - otherPosition.rank;
    return { file: fileDiff, rank: rankDiff };
  }

  getPosition() {
    return { file: this.file, rank: this.rank };
  }

  setPosition(file: string, rank: number): void {
    this.file = file;
    this.rank = rank;
  }

  constructor(file: string, rank: number) {
    this.file = file;
    this.rank = rank;
  }
}

export abstract class Piece {
  position: Position;
  private colour: string;
  private captured: boolean;
  private hasMoved: boolean = false;

  moveTo(file: string, rank: number): void {
    this.position.setPosition(file, rank);
  }

  setIsCaptured() {
    this.captured = !this.captured;
  }

  getIsCaptured() {
    return this.captured;
  }

  getColour() {
    return this.colour;
  }

  getHasMoved() {
    return this.hasMoved;
  }

  setHasMoved() {
    this.hasMoved = !this.hasMoved;
  }

  abstract canMoveTo(newPosition: Position, positions: string[]): boolean;

  constructor(pieceColour: string, file: string, rank: number) {
    this.position = new Position(file, rank);
    this.colour = pieceColour;
    this.captured = false;
  }
}
