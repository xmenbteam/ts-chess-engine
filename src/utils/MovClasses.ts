import { Piece, Position } from "../Pieces/PiecesAndPosition";
import { Colour, PieceObject, RankFile, RankFileDist } from "../Types";
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

    const minFile = Math.min(letterRef[file], letterRef[newFile]);
    const maxFile = Math.max(letterRef[file], letterRef[newFile]);

    const minRank = Math.min(rank, newRank);
    const maxRank = Math.max(rank, newRank);

    for (let i = minRank; i <= maxRank; i++) {
      const square = `${file}${i}`;
      if (this.ignoreYourself.includes(square)) this.isInWay = true;
    }

    for (let i = minFile; i <= maxFile; i++) {
      const square = `${files[i]}${rank}`;
      if (this.ignoreYourself.includes(square)) this.isInWay = true;
    }

    return this.isInWay;
  }

  checkDiagonal() {
    const { file, rank } = this.piecePos;
    const { file: newFile, rank: newRank } = this.newPos;
    this.pieceCoords = `${file}${rank}`;
    this.ignoreYourself = this.positions.filter((p) => p !== this.pieceCoords);

    let direction: string = "";

    const directionRef = {
      NE: newRank > rank && letterRef[newFile] > letterRef[file],
      SE: newRank < rank && letterRef[newFile] > letterRef[file],
      NW: newRank > rank && letterRef[newFile] < letterRef[file],
      SW: newRank < rank && letterRef[newFile] < letterRef[file],
    };

    for (const [dir, cond] of Object.entries(directionRef)) {
      if (cond) direction = dir;
    }

    if (direction === "SE") {
      for (
        let i = letterRef[file], j = rank;
        i <= letterRef[newFile] && j > 0;
        i++, j--
      ) {
        const square = `${files[i]}${j}`;
        if (this.ignoreYourself.includes(square)) this.isInWay = true;
      }
    }
    if (direction === "NE") {
      for (
        let i = letterRef[file], j = rank;
        i <= letterRef[newFile] && j <= 8;
        i++, j++
      ) {
        const square = `${files[i]}${j}`;
        if (this.ignoreYourself.includes(square)) this.isInWay = true;
      }
    }
    if (direction === "SW") {
      for (
        let i = letterRef[file], j = rank;
        i >= letterRef[newFile] && j > 0;
        i--, j--
      ) {
        const square = `${files[i]}${j}`;
        if (this.ignoreYourself.includes(square)) this.isInWay = true;
      }
    }
    if (direction === "NW") {
      for (
        let i = letterRef[file], j = rank;
        i >= letterRef[newFile] && j <= 8;
        i--, j++
      ) {
        const square = `${files[i]}${j}`;
        if (this.ignoreYourself.includes(square)) this.isInWay = true;
      }
    }
    return this.isInWay;
  }

  checkBoth() {
    this.checkRankAndFile();
    this.checkDiagonal();
    return this.isInWay;
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

export class CanMoveToSquare {
  private canMove: boolean;
  private distance: RankFileDist;

  queen() {
    const { file, rank } = this.distance;

    if (!file || !rank || Math.abs(file) === Math.abs(rank))
      this.canMove = true;
    return this.canMove;
  }

  bishop() {
    const { file, rank } = this.distance;
    if (Math.abs(file) === Math.abs(rank)) this.canMove = true;
    return this.canMove;
  }

  king() {
    const { file, rank } = this.distance;
    if (
      (Math.abs(file) === 1 && Math.abs(rank) === 1) ||
      (Math.abs(file) === 1 && !Math.abs(rank)) ||
      (!Math.abs(file) && Math.abs(rank) === 1)
    )
      this.canMove = true;

    return this.canMove;
  }

  knight() {
    const { file, rank } = this.distance;
    if (
      (Math.abs(file) === 2 && Math.abs(rank) === 1) ||
      (Math.abs(file) === 1 && Math.abs(rank) === 2)
    )
      this.canMove = true;

    return this.canMove;
  }

  pawn(hasMoved: boolean) {
    const { file, rank } = this.distance;
    if (
      (!file && Math.abs(rank) === 1) ||
      (!file && Math.abs(rank) === 2 && !hasMoved)
    )
      this.canMove = true;

    return this.canMove;
  }

  rook() {
    const { file, rank } = this.distance;

    if (!file || !rank) this.canMove = true;

    return this.canMove;
  }

  constructor(distance: RankFileDist) {
    this.canMove = false;
    this.distance = distance;
  }
}

export class SpecialMoves {
  private pieces: PieceObject;

  // KING IS 0, QUEEN IS 1

  castle(side: number, colour: number, positions: string[]) {
    const castleRefObj = {
      oldKingCoord: ["Ke1", "Ke8"],
      oldRookCoord: [
        ["Rh1", "Rh8"],
        ["Ra1", "Ra8"],
      ],
      newKingFile: ["g", "c"],
      newRookFile: ["f", "d"],
      rank: [1, 8],
    };

    const { oldKingCoord, oldRookCoord, newKingFile, newRookFile, rank } =
      castleRefObj;

    const newKingPos = new Position(
      newKingFile[side],
      rank[colour]
    ).getPosition();
    const newRookPos = new Position(
      newRookFile[side],
      rank[colour]
    ).getPosition();
    const oldKingPos = this.pieces[oldKingCoord[colour]].position.getPosition();
    const oldRookPos =
      this.pieces[oldRookCoord[side][colour]].position.getPosition();

    const isPieceInWayKing = new IsPieceInTheWay(
      oldKingPos,
      newKingPos,
      positions
    ).checkRankAndFile();

    const isPieceInWayRook = new IsPieceInTheWay(
      oldRookPos,
      newRookPos,
      positions
    ).checkRankAndFile();

    const hasNotMoved =
      !this.pieces[oldKingCoord[colour]].getHasMoved() &&
      !this.pieces[oldRookCoord[side][colour]].getHasMoved();

    const king = this.pieces[oldKingCoord[colour]];
    const rook = this.pieces[oldRookCoord[side][colour]];

    try {
      if (hasNotMoved && !isPieceInWayKing && !isPieceInWayRook) {
        king.setHasMoved();
        king.position.setPosition(newKingFile[side], rank[colour]);
        this.pieces[`K${newKingFile[side]}${rank[colour]}`] = king;
        delete this.pieces[oldKingCoord[colour]];

        rook.setHasMoved();
        rook.position.setPosition(newRookFile[side], rank[colour]);
        this.pieces[`R${newRookFile[side]}${rank[colour]}`] = rook;
        delete this.pieces[oldRookCoord[side][colour]];
        return {
          msg: `${Colour[colour]} castled ${side ? "Queen" : "King"}side!`,
        };
      } else
        return {
          msg: `${Colour[colour]} Failed to castle ${
            side ? "Queen" : "King"
          }side!`,
        };
    } catch (err) {
      console.log("CASTLING", err);
      return { msg: "ERROR" };
    }
  }

  constructor(pieces: PieceObject) {
    this.pieces = pieces;
  }
}
