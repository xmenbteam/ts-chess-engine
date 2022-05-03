import { MoveToObj, PositionDiff, RankFile } from "../../Types";
import { utils } from "../../utils/utils";

export class Position {
  private _position: { file: string; rank: number };

  distanceFrom(otherPosition: Position): PositionDiff {
    const { letterRef } = new utils().getLetterRefs();

    const fileDiff =
      letterRef[this._position.file] - letterRef[otherPosition._position.file];
    const rankDiff = this._position.rank - otherPosition._position.rank;
    return { file: fileDiff, rank: rankDiff };
  }

  public get position(): RankFile {
    return { file: this._position.file, rank: this._position.rank };
  }

  public set position({ file, rank }: RankFile) {
    this._position = { file, rank };
  }

  constructor(file: string, rank: number) {
    this._position = { file, rank };
  }
}

export abstract class Piece {
  position: Position;
  private _colour: string;
  private _isCaptured: boolean;

  public set isCaptured(isCaptured) {
    this._isCaptured = isCaptured;
  }

  public get isCaptured() {
    return this._isCaptured;
  }

  public get colour() {
    return this._colour;
  }

  abstract canMoveTo(newPosition: Position): boolean;
  abstract moveTo(file: string, rank: number): void | MoveToObj;

  constructor(pieceColour: string, file: string, rank: number) {
    this.position = new Position(file, rank);
    this._colour = pieceColour;
    this._isCaptured = false;
  }
}
