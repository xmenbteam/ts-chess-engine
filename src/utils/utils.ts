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

  private files: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];
  private ranks: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  private pawnTest = /^[a-h]\d$/;
  private pieceTest = /^[RNQBK][a-h]\d$/;
  private nameTest = /[RNBQKP]/;
  private fileReg = /[a-h]/;
  private rankReg = /[1-8]/;

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

  getLetterRefs() {
    return {
      letterRef: this.letterRef,
      files: this.files,
      ranks: this.ranks,
      flagRefObj: this.flagRefObj,
    };
  }

  getRegex() {
    return {
      pawnTest: this.pawnTest,
      pieceTest: this.pieceTest,
      fileReg: this.fileReg,
      rankReg: this.rankReg,
      nameTest: this.nameTest,
    };
  }

  getCastleRef() {
    return this.castleRefObj;
  }
}
