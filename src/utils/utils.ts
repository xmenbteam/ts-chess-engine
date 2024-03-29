import { Piece, Position } from "../Classes/PieceClasses/PiecesAndPosition";

export class utils {
  private letterRef: { [file: string]: number } = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7,
  };

  private flagRefObj: { [file: string]: string } = {
    Knight: "N",
    Bishop: "B",
    Pawn: "P",
    Queen: "Q",
    King: "K",
    Rook: "R",
  };

  private HasMovedPieces: string[] = ["King", "Rook", "Pawn"];

  private files: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];

  private pawnTest = /^[a-h]\d$/;
  private pieceTest = /^[RNQBK][a-h]\d$/;
  private nameTest = /[RNBQKP]/;
  private fileReg = /[a-h]/;
  private rankReg = /[1-8]/;
  private dubiousPieceFileReg = /^[RNQBK][a-h]{2}[1-8]$/;
  private dubiousPieceRankReg = /^[RNQBK][1-8][a-h][1-8]$/;

  private castleRefObj = {
    oldKingCoord: ["Ke1", "Ke8"],
    oldRookCoord: [
      ["Rh1", "Ra1"],
      ["Rh8", "Ra8"],
    ],
    newKingFile: ["g", "c"],
    newRookFile: ["f", "d"],
    rank: [1, 8],
  };

  static checkDirection(pieceFileDist: number, pieceRankDist: number) {
    let direction: string = "";

    const directionRef = {
      NE: pieceFileDist > 0 && pieceRankDist > 0,
      SE: pieceFileDist > 0 && pieceRankDist < 0,
      NW: pieceFileDist < 0 && pieceRankDist > 0,
      SW: pieceFileDist < 0 && pieceRankDist < 0,
      N: !pieceFileDist && pieceRankDist > 0,
      S: !pieceFileDist && pieceRankDist < 0,
      E: !pieceRankDist && pieceFileDist > 0,
      W: !pieceRankDist && pieceFileDist < 0,
    };

    for (const [dir, cond] of Object.entries(directionRef)) {
      if (cond) direction = dir;
    }

    return direction;
  }

  static generateKingSquares(king: Piece) {
    const { file, rank } = king.position.position;
    const { letterRef, files } = utils.getLetterRefs();
    const fileNum = letterRef[file];
    const positions = [];
    for (
      let f = fileNum > 0 ? fileNum - 1 : 0;
      f <= fileNum + 1 && f < 8;
      f++
    ) {
      for (let r = rank > 1 ? rank - 1 : 1; r <= rank + 1 && r < 9; r++) {
        if (!(f === fileNum && r === king.position.position.rank))
          positions.push(new Position(files[f], r));
      }
    }
    return positions;
  }

  static getLetterRefs() {
    return {
      letterRef: new utils().letterRef,
      files: new utils().files,
      // ranks: new utils().ranks,
      flagRefObj: new utils().flagRefObj,
    };
  }

  static getRegex() {
    return {
      pawnTest: new utils().pawnTest,
      pieceTest: new utils().pieceTest,
      fileReg: new utils().fileReg,
      rankReg: new utils().rankReg,
      nameTest: new utils().nameTest,
      dubiousFile: new utils().dubiousPieceFileReg,
      dubiousRank: new utils().dubiousPieceRankReg,
    };
  }

  static getCastleRef() {
    return new utils().castleRefObj;
  }
  static piecesThatNeedMoved() {
    return new utils().HasMovedPieces;
  }
}
