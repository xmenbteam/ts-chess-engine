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

    for (let piece in this.allPieces) {
      const { file: pieceFileDist, rank: pieceRankDist } = this.allPieces[
        piece
      ].position.distanceFrom(this.piecePos);
      const dirFromPiece = new utils().rankAndFileDirRef(
        pieceFileDist,
        pieceRankDist
      );

      if (dirFromPiece === "N" && pieceRankDist < destiRankDist)
        this.isInWay = true;
      if (dirFromPiece === "S" && pieceRankDist > destiRankDist)
        this.isInWay = true;
      if (dirFromPiece === "E" && pieceFileDist < destiFileDist)
        this.isInWay = true;
      if (dirFromPiece === "W" && pieceFileDist > destiFileDist)
        this.isInWay = true;
    }

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
      const { file: pieceFileDist, rank: pieceRankDist } = this.allPieces[
        piece
      ].position.distanceFrom(this.piecePos);

      const dirFromPiece = new utils().diagonalDirRef(
        pieceFileDist,
        pieceRankDist
      );

      if (
        dirFromPiece === "NE" &&
        Math.abs(pieceFileDist) === Math.abs(pieceRankDist) &&
        pieceRankDist < destiRankDist &&
        pieceFileDist < destiFileDist
      )
        this.isInWay = true;
      if (
        dirFromPiece === "SW" &&
        Math.abs(pieceFileDist) === Math.abs(pieceRankDist) &&
        pieceFileDist === pieceRankDist &&
        pieceRankDist > destiRankDist &&
        pieceFileDist > destiFileDist
      )
        this.isInWay = true;
      if (
        dirFromPiece === "SE" &&
        Math.abs(pieceFileDist) === Math.abs(pieceRankDist) &&
        pieceRankDist > destiRankDist &&
        pieceFileDist < destiFileDist
      )
        this.isInWay = true;
      if (
        dirFromPiece === "NW" &&
        Math.abs(pieceFileDist) === Math.abs(pieceRankDist) &&
        pieceRankDist < destiRankDist &&
        pieceFileDist > destiFileDist
      )
        this.isInWay = true;
    }

    return this.isInWay;
  }

  checkBoth() {
    const { file: destiFileDist, rank: destiRankDist } =
      this.destiPos.distanceFrom(this.piecePos);

    if (!destiFileDist || !destiRankDist) return this.checkRankAndFile();
    if (Math.abs(destiFileDist) === Math.abs(destiRankDist))
      return this.checkDiagonal();
    else return false;
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
