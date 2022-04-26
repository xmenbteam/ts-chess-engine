import { Position } from "../Pieces/PiecesAndPosition";
import { Pawn } from "../Pieces/Pawn";
import { Rook } from "../Pieces/Rook";
import { Bishop } from "../Pieces/Bishop";
import { Knight } from "../Pieces/Knight";
import { King } from "../Pieces/King";
import { Queen } from "../Pieces/Queen";
import { Game } from "../Game";
import { Colour } from "../Types";

describe("Position Class", () => {
  test("Position has rank/file", () => {
    const file = "g";
    const rank = 5;
    const pos = new Position(file, rank);

    const currentPos = pos.getPosition();

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
    const file = "g";
    const rank = 5;
    const pos = new Position(file, rank);

    pos.setPosition("h", 7);

    const currentPos = pos.getPosition();
    expect(currentPos.file).toBe("h");
    expect(currentPos.rank).toBe(7);
  });
});

describe.only("Piece subclasses", () => {
  describe("Pawn", () => {
    test("Properties", () => {
      const file = "a";
      const rank = 2;
      const p1 = new Pawn(Colour[1], file, rank);

      const pos = p1.position.getPosition();
      const colour = p1.getColour();

      expect(pos).toEqual({ file: "a", rank: 2 });
      expect(colour).toBe("BLACK");
    });
    test("setIsCaptured", () => {
      const file = "a";
      const rank = 2;
      const p1 = new Pawn(Colour[0], file, rank);

      expect(p1.getIsCaptured()).toBe(false);
      p1.setIsCaptured();
      expect(p1.getIsCaptured()).toBe(true);
      p1.setIsCaptured();
      expect(p1.getIsCaptured()).toBe(false);
    });
    test("canMoveTo - !hasMoved", () => {
      const game = new Game();
      const positions = game.getAllPositions();

      const p1 = game.getPieces().Pa2;

      const newPositionOne = new Position("a", 3);
      const newPositionTwo = new Position("a", 4);

      const canMoveOne = p1.canMoveTo(newPositionOne, positions);
      const canMoveTwo = p1.canMoveTo(newPositionTwo, positions);

      expect(canMoveOne).toBe(true);
      expect(canMoveTwo).toBe(true);
    });
    test("canMoveTo - hasMoved", () => {
      const game = new Game();
      const positions = game.getAllPositions();

      const p1 = game.getPieces().Pa2;
      p1.setHasMoved();

      const newPositionOne = new Position("a", 3);
      const newPositionTwo = new Position("a", 4);

      const canMoveOne = p1.canMoveTo(newPositionOne, positions);
      const canMoveTwo = p1.canMoveTo(newPositionTwo, positions);

      expect(canMoveOne).toBe(true);
      expect(canMoveTwo).toBe(false);
    });
    test("!canMoveTo - hasMoved", () => {
      const positions = ["c2", "c3"];

      const p1 = new Pawn(Colour[0], "c", 2);

      p1.setHasMoved();

      const newPositionOne = new Position("c", 3);

      const canMoveOne = p1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(false);
    });
    test("!canMoveTo - !hasMoved", () => {
      const positions = ["c2", "c4"];

      const p1 = new Pawn(Colour[0], "c", 2);

      p1.setHasMoved();

      const newPositionOne = new Position("c", 4);

      const canMoveOne = p1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(false);
    });
    test("canMoveTo - black", () => {
      const positions = ["c7", "c6"];

      const p1 = new Pawn(Colour[1], "c", 7);

      p1.setHasMoved();

      const newPositionOne = new Position("c", 6);

      const canMoveOne = p1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(false);
    });
    test("canMoveTo - black", () => {
      const positions = ["c7", "c5"];

      const p1 = new Pawn(Colour[1], "c", 7);

      const newPositionOne = new Position("c", 5);

      const canMoveOne = p1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(false);
    });
    test("canMoveTo - black", () => {
      const positions = ["c7", "c6"];

      const p1 = new Pawn(Colour[1], "c", 7);

      p1.setHasMoved();

      const newPositionOne = new Position("c", 6);

      const canMoveOne = p1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(false);
    });
    test("hasMoved", () => {
      const file = "a";
      const rank = 2;
      const p1 = new Pawn(Colour[1], file, rank);

      expect(p1.getHasMoved()).toBe(false);

      p1.setHasMoved();

      expect(p1.getHasMoved()).toBe(true);
    });
    test("first move", () => {
      const file = "a";
      const rank = 2;
      const p1 = new Pawn(Colour[1], file, rank);
    });
    test("not first move", () => {
      const file = "a";
      const rank = 2;
      const p1 = new Pawn(Colour[1], file, rank);

      p1.setHasMoved();
    });
  });
  describe("Rook", () => {
    test("!canMoveTo - rank", () => {
      const positions = ["a1", "a2"];

      const r1 = new Rook(Colour[0], "a", 1);

      const newPositionOne = new Position("a", 2);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(false);
    });
    test("!canMoveTo - rank - more complex", () => {
      const positions = ["a1", "a4"];

      const r1 = new Rook(Colour[0], "a", 1);

      const newPositionOne = new Position("a", 5);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(false);
    });
    test("!canMoveTo - FILE", () => {
      const positions = ["a1", "c1"];

      const r1 = new Rook(Colour[0], "a", 1);

      const newPositionOne = new Position("d", 1);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(false);
    });
    test("canMoveTo - FILE", () => {
      const positions = ["a1"];

      const r1 = new Rook(Colour[0], "a", 1);

      const newPositionOne = new Position("d", 1);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(true);
    });
    test("canMoveTo - DOWN", () => {
      const positions = ["d4"];

      const r1 = new Rook(Colour[0], "d", 4);

      const newPositionOne = new Position("d", 1);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(true);
    });
    test("!canMoveTo - DOWN", () => {
      const positions = ["d4", "d2"];

      const r1 = new Rook(Colour[0], "d", 4);

      const newPositionOne = new Position("d", 1);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(true);
    });
    test("canMoveTo - LEFT", () => {
      const positions = ["d4", "d2"];

      const r1 = new Rook(Colour[0], "d", 4);

      const newPositionOne = new Position("a", 4);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(true);
    });
    test("!canMoveTo - LEFT", () => {
      const positions = ["d4", "b4"];

      const r1 = new Rook(Colour[0], "d", 4);

      const newPositionOne = new Position("a", 4);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(true);
    });
    test("hasMoved", () => {
      const file = "a";
      const rank = 2;
      const r1 = new Rook(Colour[1], file, rank);

      expect(r1.getHasMoved()).toBe(false);

      r1.setHasMoved();

      expect(r1.getHasMoved()).toBe(true);
    });
  });
  describe("Bishop", () => {
    test("!canMoveTo - a1", () => {
      const positions = ["a1", "b2"];

      const r1 = new Bishop(Colour[0], "a", 1);

      const newPositionOne = new Position("c", 3);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(false);
    });
    test("!canMoveTo - e5", () => {
      const positions = ["a1", "d4"];

      const r1 = new Bishop(Colour[0], "a", 1);

      const newPositionOne = new Position("e", 5);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(false);
    });
    test("Other !canMoveTo - NE", () => {
      const positions = ["c4", "e6"];

      const r1 = new Bishop(Colour[0], "c", 4);

      const newPositionOne = new Position("g", 8);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(false);
    });
    test("Second Other !canMoveTo - NE", () => {
      const positions = ["d4", "f6"];

      const r1 = new Bishop(Colour[0], "d", 4);

      const newPositionOne = new Position("h", 8);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(false);
    });
    test("canMoveTo - c3", () => {
      const positions = ["a1", "d4"];

      const r1 = new Bishop(Colour[0], "a", 1);

      const newPositionOne = new Position("c", 3);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(true);
    });
    test("!canMoveTo - northeast", () => {
      const positions = ["d4", "f6"];

      const r1 = new Bishop(Colour[0], "d", 4);

      const newPositionOne = new Position("g", 7);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(false);
    });
    test("canMoveTo - northeast", () => {
      const positions = ["d4"];

      const r1 = new Bishop(Colour[0], "d", 4);

      const newPositionOne = new Position("g", 7);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(true);
    });
    test("canMoveTo - southeast", () => {
      const positions = ["d4"];

      const r1 = new Bishop(Colour[0], "d", 4);

      const newPositionOne = new Position("g", 1);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(true);
    });
    test("!canMoveTo - southeast", () => {
      const positions = ["d4", "f2"];

      const r1 = new Bishop(Colour[0], "d", 4);

      const newPositionOne = new Position("g", 1);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(false);
    });
    test("canMoveTo - southwest", () => {
      const positions = ["d4"];

      const r1 = new Bishop(Colour[0], "d", 4);

      const newPositionOne = new Position("b", 2);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(true);
    });
    test("!canMoveTo - southwest", () => {
      const positions = ["d4", "b2"];

      const r1 = new Bishop(Colour[0], "d", 4);

      const newPositionOne = new Position("b", 2);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(false);
    });
    test("canMoveTo - northwest", () => {
      const positions = ["d4"];

      const r1 = new Bishop(Colour[0], "d", 4);

      const newPositionOne = new Position("a", 7);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(true);
    });
    test("!canMoveTo - northwest", () => {
      const positions = ["d4", "b6"];

      const r1 = new Bishop(Colour[0], "d", 4);

      const newPositionOne = new Position("a", 7);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(false);
    });
    test("Other !canMoveTo - SW", () => {
      const positions = ["f6", "d4"];

      const r1 = new Bishop(Colour[0], "f", 6);

      const newPositionOne = new Position("a", 1);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(false);
    });
    test("Other !canMoveTo - NW", () => {
      const positions = ["e3", "c5"];

      const r1 = new Bishop(Colour[0], "e", 3);

      const newPositionOne = new Position("a", 7);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(false);
    });
    test("Other !canMoveTo - SE", () => {
      const positions = ["c6", "f3"];

      const r1 = new Bishop(Colour[0], "c", 6);

      const newPositionOne = new Position("h", 1);

      const canMoveOne = r1.canMoveTo(newPositionOne, positions);

      expect(canMoveOne).toBe(true);
    });
  });
  describe("Knight", () => {
    test("!canMoveTo", () => {
      const positions = ["a1", "b2"];

      const r1 = new Knight(Colour[0], "a", 1);

      const newPosition = new Position("f", 3);

      const canMove = r1.canMoveTo(newPosition, positions);

      expect(canMove).toBe(false);
    });
    test("canMoveTo - standard", () => {
      const positions = ["a1", "b2"];

      const r1 = new Knight(Colour[0], "b", 1);

      const newPosition = new Position("c", 3);

      const canMove = r1.canMoveTo(newPosition, positions);

      expect(canMove).toBe(true);
    });
  });
  describe("King", () => {
    test("canMoveTo - diagonal", () => {
      const file = "d";
      const rank = 4;
      const r1 = new King(Colour[1], file, rank);

      const newPosition = new Position("e", 3);

      const canMove = r1.canMoveTo(newPosition, []);

      expect(canMove).toBe(true);
    });
    test("canMoveTo - file", () => {
      const file = "d";
      const rank = 4;
      const r1 = new King(Colour[1], file, rank);

      const newPosition = new Position("e", 4);

      const canMove = r1.canMoveTo(newPosition, []);

      expect(canMove).toBe(true);
    });
    test("canMoveTo - rank", () => {
      const file = "d";
      const rank = 4;
      const r1 = new King(Colour[1], file, rank);

      const newPosition = new Position("d", 5);

      const canMove = r1.canMoveTo(newPosition, []);

      expect(canMove).toBe(true);
    });
    test("!canMoveTo - out of scope", () => {
      const file = "d";
      const rank = 4;
      const r1 = new King(Colour[1], file, rank);

      const newPosition = new Position("e", 7);

      const canMove = r1.canMoveTo(newPosition, []);

      expect(canMove).toBe(false);
    });
    test("!canMoveTo - piece to west", () => {
      const positions = ["e7", "d7"];
      const file = "d";
      const rank = 4;
      const r1 = new King(Colour[1], file, rank);

      const newPosition = new Position("e", 7);

      const canMove = r1.canMoveTo(newPosition, positions);

      expect(canMove).toBe(false);
    });
    test("!canMoveTo - piece to west", () => {
      const positions = ["e7", "d7"];
      const file = "e";
      const rank = 7;
      const r1 = new King(Colour[1], file, rank);

      const newPosition = new Position("d", 7);

      const canMove = r1.canMoveTo(newPosition, positions);

      expect(canMove).toBe(false);
    });
    test("!canMoveTo - piece to northwest", () => {
      const positions = ["e7", "d8"];
      const file = "e";
      const rank = 7;
      const r1 = new King(Colour[1], file, rank);

      const newPosition = new Position("d", 8);

      const canMove = r1.canMoveTo(newPosition, positions);

      expect(canMove).toBe(false);
    });
    test("!canMoveTo - piece to north", () => {
      const positions = ["e7", "e8"];
      const file = "e";
      const rank = 7;
      const r1 = new King(Colour[1], file, rank);

      const newPosition = new Position("e", 8);

      const canMove = r1.canMoveTo(newPosition, positions);

      expect(canMove).toBe(false);
    });
    test("!canMoveTo - piece to northeast", () => {
      const positions = ["e7", "f8"];
      const file = "e";
      const rank = 7;
      const r1 = new King(Colour[1], file, rank);

      const newPosition = new Position("f", 8);

      const canMove = r1.canMoveTo(newPosition, positions);

      expect(canMove).toBe(false);
    });
    test("!canMoveTo - piece to east", () => {
      const positions = ["e7", "f7"];
      const file = "e";
      const rank = 7;
      const r1 = new King(Colour[1], file, rank);

      const newPosition = new Position("f", 7);

      const canMove = r1.canMoveTo(newPosition, positions);

      expect(canMove).toBe(false);
    });
    test("!canMoveTo - piece to southeast", () => {
      const positions = ["e7", "f6"];
      const file = "e";
      const rank = 7;
      const r1 = new King(Colour[1], file, rank);

      const newPosition = new Position("f", 6);

      const canMove = r1.canMoveTo(newPosition, positions);

      expect(canMove).toBe(false);
    });
    test("!canMoveTo - piece to south", () => {
      const positions = ["e7", "e6"];
      const file = "e";
      const rank = 7;
      const r1 = new King(Colour[1], file, rank);

      const newPosition = new Position("e", 6);

      const canMove = r1.canMoveTo(newPosition, positions);

      expect(canMove).toBe(false);
    });
    test("!canMoveTo - piece to southwest", () => {
      const positions = ["e7", "d6"];
      const file = "e";
      const rank = 7;
      const r1 = new King(Colour[1], file, rank);

      const newPosition = new Position("d", 6);

      const canMove = r1.canMoveTo(newPosition, positions);

      expect(canMove).toBe(false);
    });
    test("hasMoved", () => {
      const file = "a";
      const rank = 2;
      const r1 = new King(Colour[1], file, rank);

      expect(r1.getHasMoved()).toBe(false);

      r1.setHasMoved();

      expect(r1.getHasMoved()).toBe(true);
    });
  });
  describe("Queen", () => {
    test("canMoveTo - d4", () => {
      const file = "d";
      const rank = 4;
      const r1 = new Queen(Colour[1], file, rank);

      const newPosition = new Position("h", 8);

      const canMove = r1.canMoveTo(newPosition, []);

      expect(canMove).toBe(true);
    });
    test("!canMoveTo - d4", () => {
      const file = "d";
      const rank = 4;
      const r1 = new Queen(Colour[1], file, rank);

      const newPosition = new Position("h", 6);

      const canMove = r1.canMoveTo(newPosition, []);

      expect(canMove).toBe(false);
    });
    test("canMoveTo", () => {
      const file = "a";
      const rank = 2;
      const r1 = new Queen(Colour[1], file, rank);

      const newPosition = new Position("h", 2);

      const canMove = r1.canMoveTo(newPosition, []);

      expect(canMove).toBe(true);
    });
    test("!canMoveTo", () => {
      const file = "a";
      const rank = 2;
      const r1 = new Queen(Colour[1], file, rank);

      const newPosition = new Position("h", 3);

      const canMove = r1.canMoveTo(newPosition, []);

      expect(canMove).toBe(false);
    });
  });
});

describe("Game", () => {
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
  test("isPieceInTheWay - bishop", () => {
    const game = new Game();
    const pieces = game.getPieces();
    const bishop = pieces.Bc1;
    const newPosition = new Position("e", 3);

    // const isPieceInTheWay = game.isPieceInTheWay(bishop);
    // expect(isPieceInTheWay).toBe(true);
  });
  test("!isPieceInTheWay - bishop", () => {
    const game = new Game();
    const pieces = game.getPieces();
    game.makeMove("b3", 0);
    const bishop = pieces.Bc1;
    const newPosition = new Position("a", 3);

    // const isPieceInTheWay = game.isPieceInTheWay(bishop);
    // expect(isPieceInTheWay).toBe(false);
  });
  test("isPieceInTheWay - rook - rank", () => {
    const game = new Game();
    const pieces = game.getPieces();
    const rook = pieces.Ra1;

    const newPosition = new Position("a", 3);

    // const isPieceInTheWay = game.isPieceInTheWay(rook);

    // expect(isPieceInTheWay).toBe(true);
  });
  test("isPieceInTheWay - rook - file", () => {
    const game = new Game();
    const pieces = game.getPieces();
    const rook = pieces.Ra1;

    const newPosition = new Position("c", 1);

    // const isPieceInTheWay = game.isPieceInTheWay(rook);

    // expect(isPieceInTheWay).toBe(true);
  });
  test("!isPieceInTheWay - pawn", () => {
    const game = new Game();
    const pieces = game.getPieces();
    const pawn = pieces.Pa2;

    const newPosition = new Position("a", 3);

    // const isPieceInTheWay = game.isPieceInTheWay(pawn);

    // expect(isPieceInTheWay).toBe(false);
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
      expect(moveTime.msg).toBe("Success!");
      expect("Nb1" in pieces).toBe(false);
      expect("Nc3" in pieces).toBe(true);
      expect(pieces.Nc3.getHasMoved()).toBe(true);
    });
    test("Move two pieces - a3, Bb2", () => {
      const game = new Game();
      const moves = ["b3", "Bb2"];
      const pieces = game.getPieces();

      game.makeMove(moves[0], 0);

      game.makeMove(moves[1], 0);

      expect("Pb2" in pieces).toBe(false);
      expect("Pb3" in pieces).toBe(true);
      expect("Bc1" in pieces).toBe(false);
      expect("Bb2" in pieces).toBe(true);
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
    describe("castling", () => {
      test("White castles kingside", () => {
        const game = new Game();
        const pieces = game.getPieces();
        const moves = ["g3", "Bg2", "Nf3"];
        moves.forEach((move) => {
          game.makeMove(move, 0);
        });

        const castleKing = "0-0";
        game.makeMove(castleKing, 0);
        expect("Kg1" in pieces).toBe(true);
        expect("Rf1" in pieces).toBe(true);
        expect(pieces.Kg1.getHasMoved()).toBe(true);
        expect(pieces.Rf1.getHasMoved()).toBe(true);
      });
      test("Black castles kingside", () => {
        const game = new Game();
        const pieces = game.getPieces();
        const moves = ["e6", "Be7", "Nf6"];
        moves.forEach((move) => {
          game.makeMove(move, 1);
        });

        const castleKing = "0-0";
        game.makeMove(castleKing, 1);

        expect("Kg8" in pieces).toBe(true);
        expect("Rf8" in pieces).toBe(true);
        expect(pieces.Kg8.getHasMoved()).toBe(true);
        expect(pieces.Rf8.getHasMoved()).toBe(true);
      });
    });
  });
});
