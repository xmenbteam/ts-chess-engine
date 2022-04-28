import { Position } from "../Classes/PieceClasses/PiecesAndPosition";

import { Game } from "../Game";
import { Colour, CustomPieceArray } from "../Types";

describe("Standard Game", () => {
  test("Has a turnCount/white goes first", () => {
    const game = new Game();

    expect(game.getColourTurn()).toBe("WHITE");
    game.incTurnCount();
    expect(game.getColourTurn()).toBe("BLACK");
    game.incTurnCount();
    expect(game.getColourTurn()).toBe("WHITE");
  });
  test("isPieceThere", () => {
    const game = new Game();

    expect(game.isPieceThere("e", 7)).toBe(true);
    expect(game.isPieceThere("f", 6)).toBe(false);
  });
  test("isPieceSameColour", () => {
    const game = new Game();

    const pieces = game.getPieces();

    const whiteRook = pieces.Ra1;
    const whiteKnight = pieces.Nb1;

    const isSame = game.isPieceSameColour(whiteRook, whiteKnight);

    expect(isSame).toBe(true);
  });
  test("!isPieceSameColour", () => {
    const game = new Game();

    const pieces = game.getPieces();

    const blackKnight = pieces.Ng8;
    const whiteKnight = pieces.Nb1;

    const isSame = game.isPieceSameColour(blackKnight, whiteKnight);

    expect(isSame).toBe(false);
  });
  describe("canMoveTo", () => {
    test("Bishop", () => {
      const pos = new Position("g", 2);
      const move = "Bg2";
      const colour = 0;

      const game = new Game();
      const pieces = game.getPieces();

      pieces.Pg2.position.setPosition("g", 3);

      const actual = game.getPiecesThatCanMove(pos, move, colour);
      const expected = ["Bf1"];

      expect(actual).toEqual(expected);
    });
  });

  describe("makeMove", () => {
    test("Move one piece - e2 - e4", () => {
      const game = new Game();
      const move = "e4";
      const pieces = game.getPieces();
      expect(pieces.Pe2.getHasMoved()).toBe(false);
      game.makeMove(move, 0);
      expect(pieces.Pe4.getHasMoved()).toBe(true);
      expect("Pe4" in pieces).toBe(true);
      expect("Pe2" in pieces).toBe(false);
    });
    test("Move piece - e2 - e4", () => {
      const game = new Game();
      const move = "e4";
      const pieces = game.getPieces();
      expect(pieces.Pe2.getHasMoved()).toBe(false);
      game.makeMove(move, 0);

      expect(pieces.Pe4.getHasMoved()).toBe(true);
      expect("Pe4" in pieces).toBe(true);
      expect("Pe2" in pieces).toBe(false);
    });
    test("Move named piece - Nb1 - Nc3", () => {
      const game = new Game();
      const move = "Nc3";
      const pieces = game.getPieces();
      expect("Nb1" in pieces).toBe(true);
      const moveTime = game.makeMove(move, 0);
      expect(moveTime.msg).toBe("Nb1 moved to c3!");
      expect("Nb1" in pieces).toBe(false);
      expect("Nc3" in pieces).toBe(true);
      expect(pieces.Nc3.getHasMoved()).toBe(true);
    });
    test("Fail - piece in way - Ra1 - c1", () => {
      const game = new Game();
      const move = "Rc1";
      const pieces = game.getPieces();
      expect("Ra1" in pieces).toBe(true);
      const moveTime = game.makeMove(move, 0);
      expect(moveTime.msg).toBe("Fail!");
      expect("Rc1" in pieces).toBe(false);
      expect("Ra1" in pieces).toBe(true);
      expect(pieces.Ra1.getHasMoved()).toBe(false);
    });
    test("Fail - piece can't move - Ra1 - Rd6", () => {
      const game = new Game();
      const move = "Rd6";
      const pieces = game.getPieces();
      expect("Ra1" in pieces).toBe(true);
      const moveTime = game.makeMove(move, 0);
      expect(moveTime.msg).toBe("Fail!");
      expect("Rd6" in pieces).toBe(false);
      expect("Ra1" in pieces).toBe(true);
      expect(pieces.Ra1.getHasMoved()).toBe(false);
    });
  });

  describe("castling", () => {
    describe("kingSide", () => {
      test("White castles kingside", () => {
        const game = new Game();
        const pieces = game.getPieces();
        const moves = ["g3", "Bg2", "Nf3"];
        moves.forEach((move) => {
          game.makeMove(move, 0);
        });

        const castleKing = "0-0";
        const castle = game.makeMove(castleKing, 0);

        expect("Kg1" in pieces).toBe(true);
        expect("Rf1" in pieces).toBe(true);
        expect(pieces.Kg1.getHasMoved()).toBe(true);
        expect(pieces.Rf1.getHasMoved()).toBe(true);
        expect(castle.msg).toBe("WHITE castled Kingside!");
      });
      test("!White castles kingside", () => {
        const game = new Game();
        const pieces = game.getPieces();
        const moves = ["g3", "Nf3"];
        moves.forEach((move) => {
          game.makeMove(move, 0);
        });

        const castleKing = "0-0";
        const castle = game.makeMove(castleKing, 0);
        expect("Kg1" in pieces).toBe(false);
        expect("Rf1" in pieces).toBe(false);
        expect(pieces.Ke1.getHasMoved()).toBe(false);
        expect(pieces.Rh1.getHasMoved()).toBe(false);
        expect(castle.msg).toBe("WHITE Failed to castle Kingside!");
      });
      test("Black castles kingside", () => {
        const game = new Game();
        const pieces = game.getPieces();
        const moves = ["e6", "Be7", "Nf6"];
        moves.forEach((move) => {
          game.makeMove(move, 1);
        });

        const castleKing = "0-0";
        const castle = game.makeMove(castleKing, 1);

        expect("Kg8" in pieces).toBe(true);
        expect("Rf8" in pieces).toBe(true);
        expect(pieces.Kg8.getHasMoved()).toBe(true);
        expect(pieces.Rf8.getHasMoved()).toBe(true);
        expect(castle.msg).toBe("BLACK castled Kingside!");
      });
    });
    describe("queenSide", () => {
      test("White castles queenside", () => {
        const game = new Game();
        const pieces = game.getPieces();
        const moves = ["b3", "c3", "Na3", "Bb2", "Qc2"];
        moves.forEach((move) => game.makeMove(move, 0));

        const castleQueen = "0-0-0";
        const castle = game.makeMove(castleQueen, 0);

        expect("Kc1" in pieces).toBe(true);
        expect("Rd1" in pieces).toBe(true);
        expect(pieces.Kc1.getHasMoved()).toBe(true);
        expect(pieces.Rd1.getHasMoved()).toBe(true);
        expect(castle.msg).toBe("WHITE castled Queenside!");
      });
      test("!White castles queenside", () => {
        const game = new Game();
        const pieces = game.getPieces();
        const moves = ["b3", "c3", "Na3", "Qc2"];
        moves.forEach((move) => {
          game.makeMove(move, 0);
        });

        const castleQueen = "0-0-0";
        const castle = game.makeMove(castleQueen, 0);
        expect("Kc1" in pieces).toBe(false);
        expect("Rd1" in pieces).toBe(false);
        expect(pieces.Ke1.getHasMoved()).toBe(false);
        expect(pieces.Rh1.getHasMoved()).toBe(false);
        expect(castle.msg).toBe("WHITE Failed to castle Queenside!");
      });
      test("Black castles queenside", () => {
        const game = new Game();
        const pieces = game.getPieces();
        const moves = ["b6", "c6", "Na6", "Bb7", "Qc7"];
        moves.forEach((move) => {
          game.makeMove(move, 1);
        });

        const castleQueen = "0-0-0";
        const castle = game.makeMove(castleQueen, 1);

        expect("Kc8" in pieces).toBe(true);
        expect("Rd8" in pieces).toBe(true);
        expect(pieces.Kc8.getHasMoved()).toBe(true);
        expect(pieces.Rd8.getHasMoved()).toBe(true);
        expect(castle.msg).toBe("BLACK castled Queenside!");
      });
    });
  });

  describe("turn", () => {
    test("Takes a standard chess notation", () => {
      const game = new Game();

      const move = "Nf3 a6";
      const turns = game.makeTurn(move);

      const pieces = game.getAllPositions();

      const expected = [
        { msg: "Ng1 moved to f3!" },
        { msg: "Pa7 moved to a6!" },
      ];

      expect(pieces.includes("f3")).toBe(true);
      expect(pieces.includes("a6")).toBe(true);
      expect(turns).toEqual(expected);
    });
  });
});

describe("Custom Game", () => {
  test("spawns a pawn", () => {
    const piecesArray: CustomPieceArray = [{ piece: "d3", colour: 0 }];
    const game = new Game(piecesArray);

    const positions = game.getAllPositions();
    const pieces = game.getPieces();
    expect(pieces.Pd3.constructor.name).toBe("Pawn");
    expect(positions).toEqual(["d3"]);
  });
  test("spawns a rook", () => {
    const piecesArray: CustomPieceArray = [{ piece: "Rd3", colour: 0 }];
    const game = new Game(piecesArray);

    const positions = game.getAllPositions();
    const pieces = game.getPieces();
    expect(pieces.Rd3.constructor.name).toBe("Rook");
    expect(positions).toEqual(["d3"]);
  });
  test("spawns a Bishop", () => {
    const piecesArray: CustomPieceArray = [{ piece: "Bd3", colour: 0 }];
    const game = new Game(piecesArray);

    const positions = game.getAllPositions();
    const pieces = game.getPieces();
    expect(pieces.Bd3.constructor.name).toBe("Bishop");
    expect(positions).toEqual(["d3"]);
  });
  test("spawns a Knight", () => {
    const piecesArray: CustomPieceArray = [{ piece: "Nd3", colour: 0 }];
    const game = new Game(piecesArray);

    const positions = game.getAllPositions();
    const pieces = game.getPieces();
    expect(pieces.Nd3.constructor.name).toBe("Knight");
    expect(positions).toEqual(["d3"]);
  });
  test("spawns a Queen", () => {
    const piecesArray: CustomPieceArray = [{ piece: "Qd3", colour: 0 }];
    const game = new Game(piecesArray);

    const positions = game.getAllPositions();
    const pieces = game.getPieces();
    expect(pieces.Qd3.constructor.name).toBe("Queen");
    expect(positions).toEqual(["d3"]);
  });
  test("spawns a King", () => {
    const piecesArray: CustomPieceArray = [{ piece: "Kd3", colour: 0 }];
    const game = new Game(piecesArray);

    const positions = game.getAllPositions();
    const pieces = game.getPieces();
    expect(pieces.Kd3.constructor.name).toBe("King");
    expect(positions).toEqual(["d3"]);
  });
  test("spawns a few", () => {
    const piecesArray: CustomPieceArray = [
      { piece: "Kd3", colour: 0 },
      { piece: "Ke3", colour: 0 },
    ];
    const game = new Game(piecesArray);

    const positions = game.getAllPositions();
    const pieces = game.getPieces();
    expect(pieces.Kd3.constructor.name).toBe("King");
    expect(pieces.Ke3.constructor.name).toBe("King");
    expect(positions).toEqual(["d3", "e3"]);
  });
  test("Doesn't spawn on same square", () => {
    const piecesArray: CustomPieceArray = [
      { piece: "Kd3", colour: 0 },
      { piece: "Kd3", colour: 0 },
      { piece: "Kd3", colour: 0 },
    ];
    const game = new Game(piecesArray);

    const positions = game.getAllPositions();
    const pieces = game.getPieces();

    expect(pieces.Kd3.constructor.name).toBe("King");
    expect(pieces.error1.constructor.name).toBe("Error");
    expect(pieces.error2.constructor.name).toBe("Error");
    expect(positions).toEqual(["d3", "z100", "z101"]);
  });
  test("Doesn't spawn on same square different pieces", () => {
    const piecesArray: CustomPieceArray = [
      { piece: "Kd3", colour: 0 },
      { piece: "Bd3", colour: 0 },
      { piece: "Nd3", colour: 0 },
    ];
    const game = new Game(piecesArray);

    const positions = game.getAllPositions();
    const pieces = game.getPieces();

    expect(pieces.Kd3.constructor.name).toBe("King");
    expect(pieces.error1.constructor.name).toBe("Error");
    expect(pieces.error2.constructor.name).toBe("Error");
    expect(positions).toEqual(["d3", "z100", "z101"]);
  });
});
