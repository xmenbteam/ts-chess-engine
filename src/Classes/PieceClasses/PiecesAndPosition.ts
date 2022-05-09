import { MoveToObj, PositionDiff, RankFile } from "../../Types";
import { utils } from "../../utils/utils";

export class Position {
  #position: { file: string; rank: number };

  distanceFrom(otherPosition: Position): PositionDiff {
    const { letterRef } = utils.getLetterRefs();

    const fileDiff =
      letterRef[this.#position.file] - letterRef[otherPosition.#position.file];
    const rankDiff = this.#position.rank - otherPosition.#position.rank;
    return { file: fileDiff, rank: rankDiff };
  }

  get position(): RankFile {
    return { file: this.#position.file, rank: this.#position.rank };
  }

  set position({ file, rank }: RankFile) {
    this.#position = { file, rank };
  }

  constructor(file: string, rank: number) {
    this.#position = { file, rank };
  }
}

export abstract class Piece {
  position: Position;
  #colour: string;
  #isCaptured: boolean;

  set isCaptured(isCaptured) {
    this.#isCaptured = isCaptured;
  }

  get isCaptured() {
    return this.#isCaptured;
  }

  get colour() {
    return this.#colour;
  }

  abstract canMoveTo(newPosition: Position): boolean;
  abstract moveTo(file: string, rank: number): void | MoveToObj;

  constructor(pieceColour: string, file: string, rank: number) {
    this.position = new Position(file, rank);
    this.#colour = pieceColour;
    this.#isCaptured = false;
  }
}
