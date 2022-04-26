import { RankFile } from "../Types";
import { letterRef, files } from "./utils";

export class IsPieceInTheWay {
  private isInWay: boolean = false;
  private piecePos: RankFile;
  private newPos: RankFile;
  private positions: string[];
  private pieceCoords: string;
  private ignoreYourself: string[];
  private wrongSquares: string[];

  checkRankAndFile() {
    const { file, rank } = this.piecePos;
    const { file: newFile, rank: newRank } = this.newPos;

    this.pieceCoords = `${file}${rank}`;
    this.ignoreYourself = this.positions.filter((p) => p !== this.pieceCoords);

    for (let i = rank; i <= newRank; i++) {
      if (this.ignoreYourself.includes(`${file}${i}`)) this.isInWay = true;
    }

    for (let i = letterRef[file]; i <= letterRef[newFile]; i++) {
      if (this.ignoreYourself.includes(`${files[i]}${rank}`))
        this.isInWay = true;
    }

    return this.isInWay;
  }

  checkDiagonal() {
    const { file, rank } = this.piecePos;
    const { file: newFile, rank: newRank } = this.newPos;
    this.pieceCoords = `${file}${rank}`;
    this.ignoreYourself = this.positions.filter((p) => p !== this.pieceCoords);

    // Checks if piece is moving SOUTHEAST
    for (let i = newRank; i < rank; i++) {
      const square = `${files[rank + i - 1]}${rank - i}`;
      if (this.ignoreYourself.includes(square)) this.isInWay = true;
    }
    // Checks if piece is moving NORTHEAST
    for (let i = letterRef[file], j = rank; i < letterRef[newFile]; i++, j++) {
      const square = `${files[i]}${j}`;
      if (this.ignoreYourself.includes(square)) this.isInWay = true;
    }
    // Checks if piece is moving SOUTHWEST
    for (let i = rank; i >= newRank; i--) {
      const square = `${files[rank - i]}${rank - i + 1}`;
      if (this.ignoreYourself.includes(square)) this.isInWay = true;
    }
    // Checks if piece is moving NORTHWEST
    for (let i = rank; i < newRank; i++) {
      const square = `${files[i - rank]}${newRank - i + rank}`;
      if (this.ignoreYourself.includes(square)) this.isInWay = true;
    }

    return this.isInWay;
  }

  checkBoth() {
    return this.checkDiagonal() && this.checkRankAndFile();
  }

  checkKingMove() {
    const { file, rank } = this.piecePos;
    this.ignoreYourself = this.positions.filter((p) => p !== this.pieceCoords);

    this.wrongSquares = [
      `${files[letterRef[file] - 1]}${rank}`,
      `${files[letterRef[file] - 1]}${rank + 1}`,
      `${files[letterRef[file]]}${rank + 1}`,
      `${files[letterRef[file] + 1]}${rank + 1}`,
      `${files[letterRef[file] + 1]}${rank}`,
      `${files[letterRef[file] + 1]}${rank - 1}`,
      `${files[letterRef[file]]}${rank - 1}`,
      `${files[letterRef[file] - 1]}${rank - 1}`,
    ];

    this.wrongSquares.forEach((squ) => {
      if (this.ignoreYourself.includes(squ)) this.isInWay = true;
    });

    return this.isInWay;
  }

  checkPawnMove() {
    const { file: newFile, rank: newRank } = this.newPos;
    this.ignoreYourself = this.positions.filter((p) => p !== this.pieceCoords);
    this.isInWay = this.ignoreYourself.includes(`${newFile}${newRank}`);

    return this.isInWay;
  }

  constructor(piecePos: RankFile, newPos: RankFile, positions: string[]) {
    this.piecePos = piecePos;
    this.newPos = newPos;
    this.positions = positions;
    this.pieceCoords = "";
    this.ignoreYourself = [];
    this.wrongSquares = [];
  }
}
