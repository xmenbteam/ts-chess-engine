import { letterRef, files } from "./utils";

export class IsPieceInTheWay {
  private isInWay: boolean = false;
  private pieceFile: string;
  private pieceRank: number;
  private newFile: string;
  private newRank: number;
  private positions: string[];
  private pieceCoords: string;
  private ignoreYourself: string[];
  private wrongSquares: string[];

  checkRankAndFile() {
    this.pieceCoords = `${this.pieceFile}${this.pieceRank}`;
    this.ignoreYourself = this.positions.filter((p) => p !== this.pieceCoords);

    for (let i = this.pieceRank; i <= this.newRank; i++) {
      if (this.ignoreYourself.includes(`${this.pieceFile}${i}`))
        this.isInWay = true;
    }

    for (let i = letterRef[this.pieceFile]; i <= letterRef[this.newFile]; i++) {
      if (this.ignoreYourself.includes(`${files[i]}${this.pieceRank}`))
        this.isInWay = true;
    }

    return this.isInWay;
  }

  checkDiagonal() {
    this.pieceCoords = `${this.pieceFile}${this.pieceRank}`;
    this.ignoreYourself = this.positions.filter((p) => p !== this.pieceCoords);

    // Checks if piece is moving SOUTHEAST
    for (let i = this.newRank; i < this.pieceRank; i++) {
      const square = `${files[this.pieceRank + i - 1]}${this.pieceRank - i}`;
      if (this.ignoreYourself.includes(square)) this.isInWay = true;
    }
    // Checks if piece is moving NORTHEAST
    for (
      let i = letterRef[this.pieceFile], j = this.pieceRank;
      i < letterRef[this.newFile];
      i++, j++
    ) {
      const square = `${files[i]}${j}`;
      if (this.ignoreYourself.includes(square)) this.isInWay = true;
    }
    // Checks if piece is moving SOUTHWEST
    for (let i = this.pieceRank; i >= this.newRank; i--) {
      const square = `${files[this.pieceRank - i]}${this.pieceRank - i + 1}`;
      if (this.ignoreYourself.includes(square)) this.isInWay = true;
    }
    // Checks if piece is moving NORTHWEST
    for (let i = this.pieceRank; i < this.newRank; i++) {
      const square = `${files[i - this.pieceRank]}${
        this.newRank - i + this.pieceRank
      }`;
      if (this.ignoreYourself.includes(square)) this.isInWay = true;
    }

    return this.isInWay;
  }

  checkBoth() {
    return this.checkDiagonal() && this.checkRankAndFile();
  }

  checkKingMove() {
    this.wrongSquares = [
      `${files[letterRef[this.pieceFile] - 1]}${this.pieceRank}`,
      `${files[letterRef[this.pieceFile] - 1]}${this.pieceRank + 1}`,
      `${files[letterRef[this.pieceFile]]}${this.pieceRank + 1}`,
      `${files[letterRef[this.pieceFile] + 1]}${this.pieceRank + 1}`,
      `${files[letterRef[this.pieceFile] + 1]}${this.pieceRank}`,
      `${files[letterRef[this.pieceFile] + 1]}${this.pieceRank - 1}`,
      `${files[letterRef[this.pieceFile]]}${this.pieceRank - 1}`,
      `${files[letterRef[this.pieceFile] - 1]}${this.pieceRank - 1}`,
    ];

    this.wrongSquares.forEach((squ) => {
      if (this.ignoreYourself.includes(squ)) this.isInWay = true;
    });

    return this.isInWay;
  }

  constructor(
    pieceFile: string,
    pieceRank: number,
    newFile: string,
    newRank: number,
    positions: string[]
  ) {
    this.pieceFile = pieceFile;
    this.pieceRank = pieceRank;
    this.newFile = newFile;
    this.newRank = newRank;
    this.positions = positions;
    this.pieceCoords = "";
    this.ignoreYourself = [];
    this.wrongSquares = [];
  }
}
