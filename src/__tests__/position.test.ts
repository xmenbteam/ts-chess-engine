import { IsPieceInTheWay } from "../Classes/MovementClasses/IsPieceInTheWay";
import { Position } from "../Classes/PieceClasses/PiecesAndPosition";
import { Game } from "../Game";

describe("Position Class", () => {
  test("Position has rank/file", () => {
    const file = "g";
    const rank = 5;
    const pos = new Position(file, rank);

    const currentPos = pos.position;

    expect(currentPos.rank).toBe(rank);
    expect(currentPos.file).toBe(file);
  });
  test("distanceFrom", () => {
    const posOne = new Position("f", 5);
    const posTwo = new Position("d", 3);

    const diffOne = posOne.distanceFrom(posTwo);
    const diffTwo = posTwo.distanceFrom(posOne);

    expect(diffOne).toEqual({ file: 2, rank: 2 });
    expect(diffTwo).toEqual({ file: -2, rank: -2 });
  });
  test("setPosition", () => {
    const pos = new Position("g", 5);

    pos.position = { file: "h", rank: 7 };

    const currentPos = pos.position;
    expect(currentPos.file).toBe("h");
    expect(currentPos.rank).toBe(7);
  });
});

describe("IsPieceInTheWay", () => {
  describe("Rank and File", () => {
    test("isPieceInWay file - east", () => {
      const pieces = [
        { piece: "Rb5", colour: 0 },
        { piece: "Ke5", colour: 1 },
      ];
      const game = new Game(pieces);
      const rookPos = game.pieces.Rb5.position;
      const destiPos = new Position("g", 5);
      const gamePieces = game.pieces;

      const rankAnFileCheck = new IsPieceInTheWay(
        rookPos,
        destiPos,
        gamePieces
      ).checkRankAndFile();

      expect(rankAnFileCheck).toBe(true);
    });
    test("isPieceInWay file - west", () => {
      const pieces = [
        { piece: "Rh5", colour: 0 },
        { piece: "Ke5", colour: 1 },
      ];
      const game = new Game(pieces);
      const rookPos = game.pieces.Rh5.position;
      const destiPos = new Position("b", 5);
      const gamePieces = game.pieces;

      const rankAnFileCheck = new IsPieceInTheWay(
        rookPos,
        destiPos,
        gamePieces
      ).checkRankAndFile();

      expect(rankAnFileCheck).toBe(true);
    });
    test("IsPieceInWay Rank - north", () => {
      const pieces = [
        { piece: "Re2", colour: 0 },
        { piece: "Ke5", colour: 1 },
      ];
      const game = new Game(pieces);
      const rookPos = game.pieces.Re2.position;
      const destiPos = new Position("e", 7);
      const gamePieces = game.pieces;

      const rankAnFileCheck = new IsPieceInTheWay(
        rookPos,
        destiPos,
        gamePieces
      ).checkRankAndFile();

      expect(rankAnFileCheck).toBe(true);
    });
    test("IsPieceInWay Rank - south", () => {
      const pieces = [
        { piece: "Re7", colour: 0 },
        { piece: "Ke5", colour: 1 },
      ];
      const game = new Game(pieces);
      const rookPos = game.pieces.Re7.position;
      const destiPos = new Position("e", 2);
      const gamePieces = game.pieces;

      const rankAnFileCheck = new IsPieceInTheWay(
        rookPos,
        destiPos,
        gamePieces
      ).checkRankAndFile();

      expect(rankAnFileCheck).toBe(true);
    });
    test("!isPieceInWay file - east", () => {
      const pieces = [
        { piece: "Rb5", colour: 0 },
        { piece: "Ke6", colour: 1 },
      ];
      const game = new Game(pieces);
      const rookPos = game.pieces.Rb5.position;
      const destiPos = new Position("g", 5);
      const gamePieces = game.pieces;

      const rankAnFileCheck = new IsPieceInTheWay(
        rookPos,
        destiPos,
        gamePieces
      ).checkRankAndFile();

      expect(rankAnFileCheck).toBe(false);
    });
    test("!isPieceInWay file - west", () => {
      const pieces = [
        { piece: "Rh5", colour: 0 },
        { piece: "Ke6", colour: 1 },
      ];
      const game = new Game(pieces);
      const rookPos = game.pieces.Rh5.position;
      const destiPos = new Position("b", 5);
      const gamePieces = game.pieces;

      const rankAnFileCheck = new IsPieceInTheWay(
        rookPos,
        destiPos,
        gamePieces
      ).checkRankAndFile();

      expect(rankAnFileCheck).toBe(false);
    });
    test("!IsPieceInWay Rank - south", () => {
      const pieces = [
        { piece: "Re7", colour: 0 },
        { piece: "Kf5", colour: 1 },
      ];
      const game = new Game(pieces);
      const rookPos = game.pieces.Re7.position;
      const destiPos = new Position("e", 2);
      const gamePieces = game.pieces;

      const rankAnFileCheck = new IsPieceInTheWay(
        rookPos,
        destiPos,
        gamePieces
      ).checkRankAndFile();

      expect(rankAnFileCheck).toBe(false);
    });
  });
  describe("Diagonal", () => {
    test("northEast", () => {
      const pieces = [
        { piece: "Bb2", colour: 0 },
        { piece: "Nd4", colour: 1 },
      ];
      const game = new Game(pieces);
      const rookPos = game.pieces.Bb2.position;
      const destiPos = new Position("f", 6);
      const gamePieces = game.pieces;

      const diagonalCheck = new IsPieceInTheWay(
        rookPos,
        destiPos,
        gamePieces
      ).checkDiagonal();

      expect(diagonalCheck).toBe(true);
    });
    test("southEast", () => {
      const pieces = [
        { piece: "Bb6", colour: 0 },
        { piece: "Nd4", colour: 1 },
      ];
      const game = new Game(pieces);
      const rookPos = game.pieces.Bb6.position;
      const destiPos = new Position("f", 2);
      const gamePieces = game.pieces;

      const diagonalCheck = new IsPieceInTheWay(
        rookPos,
        destiPos,
        gamePieces
      ).checkDiagonal();

      expect(diagonalCheck).toBe(true);
    });
    test("southWest", () => {
      const pieces = [
        { piece: "Bf6", colour: 0 },
        { piece: "Nd4", colour: 1 },
      ];
      const game = new Game(pieces);
      const rookPos = game.pieces.Bf6.position;
      const destiPos = new Position("b", 2);
      const gamePieces = game.pieces;

      const diagonalCheck = new IsPieceInTheWay(
        rookPos,
        destiPos,
        gamePieces
      ).checkDiagonal();

      expect(diagonalCheck).toBe(true);
    });
    test("northWest", () => {
      const pieces = [
        { piece: "Bf2", colour: 0 },
        { piece: "Nd4", colour: 1 },
      ];
      const game = new Game(pieces);
      const rookPos = game.pieces.Bf2.position;
      const destiPos = new Position("b", 6);
      const gamePieces = game.pieces;

      const diagonalCheck = new IsPieceInTheWay(
        rookPos,
        destiPos,
        gamePieces
      ).checkDiagonal();

      expect(diagonalCheck).toBe(true);
    });
    test("!northEast", () => {
      const pieces = [
        { piece: "Bb2", colour: 0 },
        { piece: "Ne4", colour: 1 },
      ];
      const game = new Game(pieces);
      const rookPos = game.pieces.Bb2.position;
      const destiPos = new Position("f", 6);
      const gamePieces = game.pieces;

      const diagonalCheck = new IsPieceInTheWay(
        rookPos,
        destiPos,
        gamePieces
      ).checkBoth();

      expect(diagonalCheck).toBe(false);
    });
    test("!southEast", () => {
      const pieces = [
        { piece: "Bb6", colour: 0 },
        { piece: "Ne4", colour: 1 },
      ];
      const game = new Game(pieces);
      const rookPos = game.pieces.Bb6.position;
      const destiPos = new Position("f", 2);
      const gamePieces = game.pieces;

      const diagonalCheck = new IsPieceInTheWay(
        rookPos,
        destiPos,
        gamePieces
      ).checkBoth();

      expect(diagonalCheck).toBe(false);
    });
    test("!southWest", () => {
      const pieces = [
        { piece: "Bf6", colour: 0 },
        { piece: "Ne4", colour: 1 },
      ];
      const game = new Game(pieces);
      const rookPos = game.pieces.Bf6.position;
      const destiPos = new Position("b", 2);
      const gamePieces = game.pieces;

      const diagonalCheck = new IsPieceInTheWay(
        rookPos,
        destiPos,
        gamePieces
      ).checkBoth();

      expect(diagonalCheck).toBe(false);
    });
    test("!northWest", () => {
      const pieces = [
        { piece: "Bf2", colour: 0 },
        { piece: "Ne4", colour: 1 },
      ];
      const game = new Game(pieces);
      const rookPos = game.pieces.Bf2.position;
      const destiPos = new Position("b", 6);
      const gamePieces = game.pieces;

      const diagonalCheck = new IsPieceInTheWay(
        rookPos,
        destiPos,
        gamePieces
      ).checkBoth();

      expect(diagonalCheck).toBe(false);
    });
  });
  describe("Check Both", () => {
    test("Diagonally in way", () => {
      const pieces = [
        { piece: "Bb2", colour: 0 },
        { piece: "Nd4", colour: 1 },
      ];
      const game = new Game(pieces);
      const rookPos = game.pieces.Bb2.position;
      const destiPos = new Position("f", 6);
      const gamePieces = game.pieces;

      const diagonalCheck = new IsPieceInTheWay(
        rookPos,
        destiPos,
        gamePieces
      ).checkBoth();

      expect(diagonalCheck).toBe(true);
    });
    test("Rank and file in way", () => {
      const pieces = [
        { piece: "Rb5", colour: 0 },
        { piece: "Ke5", colour: 1 },
      ];
      const game = new Game(pieces);
      const rookPos = game.pieces.Rb5.position;
      const destiPos = new Position("g", 5);
      const gamePieces = game.pieces;

      const rankAnFileCheck = new IsPieceInTheWay(
        rookPos,
        destiPos,
        gamePieces
      ).checkBoth();

      expect(rankAnFileCheck).toBe(true);
    });
  });
  describe("Check king moves", () => {
    test("pieces are all in the way", () => {
      const pieces = [
        { piece: "Ke5", colour: 1 },
        { piece: "Ke6", colour: 1 },
        { piece: "Kf6", colour: 1 },
        { piece: "Kf5", colour: 1 },
        { piece: "Kf4", colour: 1 },
        { piece: "Ke4", colour: 1 },
        { piece: "Kd4", colour: 1 },
        { piece: "Kd5", colour: 1 },
        { piece: "Kd6", colour: 1 },
      ];

      const game = new Game(pieces);

      const kingPos = game.pieces.Ke5.position;
      const gamePieces = game.pieces;

      const e6 = new Position("e", 6);
      const e6Check = new IsPieceInTheWay(
        kingPos,
        e6,
        gamePieces
      ).checkKingMove();

      expect(e6Check).toBe(true);
      const f6 = new Position("f", 6);
      const f6Check = new IsPieceInTheWay(
        kingPos,
        f6,
        gamePieces
      ).checkKingMove();

      expect(f6Check).toBe(true);
      const f5 = new Position("f", 5);
      const f5Check = new IsPieceInTheWay(
        kingPos,
        f5,
        gamePieces
      ).checkKingMove();

      expect(f5Check).toBe(true);
      const f4 = new Position("f", 4);
      const f4Check = new IsPieceInTheWay(
        kingPos,
        f4,
        gamePieces
      ).checkKingMove();

      expect(f4Check).toBe(true);
      const e4 = new Position("e", 4);
      const e4Check = new IsPieceInTheWay(
        kingPos,
        e4,
        gamePieces
      ).checkKingMove();

      expect(e4Check).toBe(true);
      const d4 = new Position("d", 4);
      const d4Check = new IsPieceInTheWay(
        kingPos,
        d4,
        gamePieces
      ).checkKingMove();

      expect(d4Check).toBe(true);
      const d5 = new Position("d", 5);
      const d5Check = new IsPieceInTheWay(
        kingPos,
        d5,
        gamePieces
      ).checkKingMove();

      expect(d5Check).toBe(true);
      const d6 = new Position("d", 6);
      const d6Check = new IsPieceInTheWay(
        kingPos,
        d6,
        gamePieces
      ).checkKingMove();

      expect(d6Check).toBe(true);
    });
  });
});
