import { PieceObject, RankFile } from "../../Types";
import { utils } from "../../utils/utils";
import { Position } from "../PieceClasses/PiecesAndPosition";

export class IsPieceInTheWay {
  static checkRankAndFile(
    piecePos: Position,
    destiPos: Position,
    allPieces: PieceObject
  ): boolean {
    let isInWay: boolean = false;
    const { file: destiFileDist, rank: destiRankDist } =
      destiPos.distanceFrom(piecePos);

    for (let piece in allPieces) {
      const { file: pieceFileDist, rank: pieceRankDist } =
        allPieces[piece].position.distanceFrom(piecePos);
      const dirFromPiece = utils.rankAndFileDirRef(
        pieceFileDist,
        pieceRankDist
      );

      if (dirFromPiece === "N" && pieceRankDist < destiRankDist) isInWay = true;
      if (dirFromPiece === "S" && pieceRankDist > destiRankDist) isInWay = true;
      if (dirFromPiece === "E" && pieceFileDist < destiFileDist) isInWay = true;
      if (dirFromPiece === "W" && pieceFileDist > destiFileDist) isInWay = true;
    }

    return isInWay;
  }

  static setIsInWay(i: number, j: number, ignoreYourself: string[]) {
    let isInWay: boolean = false;
    const { files } = utils.getLetterRefs();
    const square = `${files[i]}${j}`;
    if (ignoreYourself.includes(square)) isInWay = true;
  }

  static checkDiagonal(
    piecePos: Position,
    destiPos: Position,
    allPieces: PieceObject
  ) {
    let isInWay: boolean = false;
    const { file: destiFileDist, rank: destiRankDist } =
      destiPos.distanceFrom(piecePos);

    for (let piece in allPieces) {
      const { file: pieceFileDist, rank: pieceRankDist } =
        allPieces[piece].position.distanceFrom(piecePos);

      const dirFromPiece = utils.diagonalDirRef(pieceFileDist, pieceRankDist);

      if (
        dirFromPiece === "NE" &&
        Math.abs(pieceFileDist) === Math.abs(pieceRankDist) &&
        pieceRankDist < destiRankDist &&
        pieceFileDist < destiFileDist
      )
        isInWay = true;
      if (
        dirFromPiece === "SW" &&
        Math.abs(pieceFileDist) === Math.abs(pieceRankDist) &&
        pieceFileDist === pieceRankDist &&
        pieceRankDist > destiRankDist &&
        pieceFileDist > destiFileDist
      )
        isInWay = true;
      if (
        dirFromPiece === "SE" &&
        Math.abs(pieceFileDist) === Math.abs(pieceRankDist) &&
        pieceRankDist > destiRankDist &&
        pieceFileDist < destiFileDist
      )
        isInWay = true;
      if (
        dirFromPiece === "NW" &&
        Math.abs(pieceFileDist) === Math.abs(pieceRankDist) &&
        pieceRankDist < destiRankDist &&
        pieceFileDist > destiFileDist
      )
        isInWay = true;
    }

    return isInWay;
  }

  static checkBoth(
    piecePos: Position,
    destiPos: Position,
    allPieces: PieceObject
  ) {
    const { file: destiFileDist, rank: destiRankDist } =
      destiPos.distanceFrom(piecePos);

    if (!destiFileDist || !destiRankDist)
      return IsPieceInTheWay.checkRankAndFile(piecePos, destiPos, allPieces);
    if (Math.abs(destiFileDist) === Math.abs(destiRankDist))
      return IsPieceInTheWay.checkDiagonal(piecePos, destiPos, allPieces);
    else return false;
  }

  static checkKingMove(
    piecePos: Position,
    destiPos: Position,
    allPieces: PieceObject
  ) {
    let isInWay: boolean = false;
    for (let piece in allPieces) {
      const { file: fileDistance, rank: rankDistance } =
        allPieces[piece].position.distanceFrom(piecePos);

      if (
        (Math.abs(rankDistance) === 1 && !fileDistance) ||
        (!rankDistance && Math.abs(fileDistance) === 1) ||
        (Math.abs(fileDistance) === 1 && Math.abs(rankDistance) === 1)
      )
        isInWay = true;
    }

    return isInWay;
  }
}
