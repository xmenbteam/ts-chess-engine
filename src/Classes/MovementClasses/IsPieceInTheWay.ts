import { PieceObject, RankFile } from "../../Types";
import { utils } from "../../utils/utils";
import { Position } from "../PieceClasses/PiecesAndPosition";

export class IsPieceInTheWay {
  private isInWay: boolean = false;
  private piecePos: Position;
  private destiPos: Position;
  private allPieces: PieceObject;

  checkRankAndFile(): boolean {
    const { file: destiFileDist, rank: destiRankDist } =
      this.destiPos.distanceFrom(this.piecePos);

    console.log({ destiFileDist, destiRankDist });

    for (let piece in this.allPieces) {
      const { file: pieceFileDist, rank: pieceRankDist } = this.allPieces[
        piece
      ].position.distanceFrom(this.piecePos);

      if (
        pieceFileDist === 0 &&
        pieceRankDist > 0 &&
        pieceRankDist < destiRankDist
      )
        this.isInWay = true;

      if (
        pieceFileDist === 0 &&
        pieceFileDist < 0 &&
        pieceFileDist > destiFileDist
      )
        this.isInWay = true;
      if (
        pieceRankDist === 0 &&
        pieceFileDist > 0 &&
        pieceRankDist < destiRankDist
      )
        this.isInWay = true;

      if (
        pieceRankDist === 0 &&
        pieceFileDist < 0 &&
        pieceFileDist > destiFileDist
      )
        this.isInWay = true;
    }

    console.log("isinwat", this.isInWay);

    return this.isInWay;
  }

  setIsInWay(i: number, j: number, ignoreYourself: string[]) {
    const { files } = new utils().getLetterRefs();
    const square = `${files[i]}${j}`;
    if (ignoreYourself.includes(square)) this.isInWay = true;
  }

  checkDiagonal() {
    const { file: destiFileDist, rank: destiRankDist } =
      this.destiPos.distanceFrom(this.piecePos);

    for (let piece in this.allPieces) {
      const { file: fileDistance, rank: rankDistance } = this.allPieces[
        piece
      ].position.distanceFrom(this.piecePos);

      if (
        Math.abs(rankDistance) > 0 &&
        Math.abs(fileDistance) > 0 &&
        Math.abs(rankDistance) === Math.abs(fileDistance) &&
        Math.abs(destiFileDist) === Math.abs(destiRankDist)
      )
        this.isInWay = true;
    }

    return this.isInWay;
  }

  checkBoth() {
    const { file: destiFileDist, rank: destiRankDist } =
      this.destiPos.distanceFrom(this.piecePos);

    console.log({ destiFileDist, destiRankDist });
    console.log(this.isInWay);

    if (!destiFileDist || !destiRankDist) return this.checkRankAndFile();
    else return this.checkDiagonal();
  }

  checkKingMove() {
    for (let piece in this.allPieces) {
      const { file: fileDistance, rank: rankDistance } = this.allPieces[
        piece
      ].position.distanceFrom(this.piecePos);

      if (
        (Math.abs(rankDistance) === 1 && !fileDistance) ||
        (!rankDistance && Math.abs(fileDistance) === 1) ||
        (Math.abs(fileDistance) === 1 && Math.abs(rankDistance) === 1)
      )
        this.isInWay = true;
    }

    return this.isInWay;
  }

  constructor(piecePos: Position, destiPos: Position, allPieces: PieceObject) {
    this.piecePos = piecePos;
    this.destiPos = destiPos;
    this.allPieces = allPieces;
  }
}
