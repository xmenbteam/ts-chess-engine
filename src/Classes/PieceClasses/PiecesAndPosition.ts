import { PositionDiff } from "../../Types";
import { utils } from "../../utils/utils";

export class Position {
  private file: string;
  private rank: number;

  distanceFrom(otherPosition: Position): PositionDiff {
    const { letterRef } = new utils().getLetterRefs();

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
  private isCaptured: boolean;
  private hasMoved: boolean;
  private moveCount: number;
  private previousSquares: string[];

  moveTo(file: string, rank: number): void {
    this.position.setPosition(file, rank);
    this.incrementMoveCount();
    this.addPreviousSquare(file, rank);
  }

  getPreviousSquares() {
    return this.previousSquares;
  }

  addPreviousSquare(file: string, rank: number) {
    this.previousSquares.push(`${file}${rank}`);
  }

  setIsCaptured() {
    this.isCaptured = true;
  }

  setIsFree() {
    this.isCaptured = false;
  }

  getIsCaptured() {
    return this.isCaptured;
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

  getMoveCount() {
    return this.moveCount;
  }

  incrementMoveCount() {
    this.moveCount++;
  }

  abstract canMoveTo(newPosition: Position, positions: string[]): boolean;

  constructor(pieceColour: string, file: string, rank: number) {
    this.position = new Position(file, rank);
    this.colour = pieceColour;
    this.isCaptured = false;
    this.hasMoved = false;
    this.moveCount = 0;
    this.previousSquares = [`${file}${rank}`];
  }
}
