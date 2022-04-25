import { Piece, Position } from "../Pieces/PiecesAndPosition";
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

describe("Piece subclasses", () => {
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
      const file = "a";
      const rank = 2;
      const p1 = new Pawn(Colour[0], file, rank);

      const newPositionOne = new Position("a", 3);
      const newPositionTwo = new Position("a", 4);

      const canMoveOne = p1.canMoveTo(newPositionOne);
      const canMoveTwo = p1.canMoveTo(newPositionTwo);

      expect(canMoveOne).toBe(true);
      expect(canMoveTwo).toBe(true);
    });
    test("canMoveTo - hasMoved", () => {
      const file = "a";
      const rank = 2;
      const p1 = new Pawn(Colour[0], file, rank);
      p1.setHasMoved();

      const newPositionOne = new Position("a", 3);
      const newPositionTwo = new Position("a", 4);

      const canMoveOne = p1.canMoveTo(newPositionOne);
      const canMoveTwo = p1.canMoveTo(newPositionTwo);

      expect(canMoveOne).toBe(true);
      expect(canMoveTwo).toBe(false);
    });
    test("canMoveTo - hasMoved", () => {
      const file = "a";
      const rank = 2;
      const p1 = new Pawn(Colour[0], file, rank);
      p1.setHasMoved();

      const newPositionOne = new Position("a", 5);

      const canMoveOne = p1.canMoveTo(newPositionOne);

      expect(canMoveOne).toBe(false);
    });
    test("canMoveTo - black", () => {
      const file = "a";
      const rank = 8;
      const p1 = new Pawn(Colour[1], file, rank);
      p1.setHasMoved();

      const newPositionOne = new Position("a", 7);

      const canMoveOne = p1.canMoveTo(newPositionOne);

      expect(canMoveOne).toBe(true);
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
    test("canMoveTo", () => {
      const file = "a";
      const rank = 2;
      const r1 = new Rook(Colour[1], file, rank);

      const newPosition = new Position("h", 2);

      const canMove = r1.canMoveTo(newPosition);

      expect(canMove).toBe(true);
    });
    test("!canMoveTo", () => {
      const file = "a";
      const rank = 2;
      const r1 = new Rook(Colour[1], file, rank);

      const newPosition = new Position("h", 3);

      const canMove = r1.canMoveTo(newPosition);

      expect(canMove).toBe(false);
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
    test("canMoveTo - d4", () => {
      const file = "d";
      const rank = 4;
      const r1 = new Bishop(Colour[1], file, rank);

      const newPosition = new Position("h", 8);

      const canMove = r1.canMoveTo(newPosition);

      expect(canMove).toBe(true);
    });
    test("!canMoveTo - d4", () => {
      const file = "d";
      const rank = 4;
      const r1 = new Bishop(Colour[1], file, rank);

      const newPosition = new Position("h", 6);

      const canMove = r1.canMoveTo(newPosition);

      expect(canMove).toBe(false);
    });
  });
  describe("Knight", () => {
    test("canMoveTo", () => {
      const file = "d";
      const rank = 4;
      const r1 = new Knight(Colour[1], file, rank);

      const newPosition = new Position("f", 3);

      const canMove = r1.canMoveTo(newPosition);

      expect(canMove).toBe(true);
    });
    test("!canMoveTo", () => {
      const file = "d";
      const rank = 4;
      const r1 = new Knight(Colour[1], file, rank);

      const newPosition = new Position("f", 4);

      const canMove = r1.canMoveTo(newPosition);

      expect(canMove).toBe(false);
    });
  });
  describe("King", () => {
    test("canMoveTo - diagonal", () => {
      const file = "d";
      const rank = 4;
      const r1 = new King(Colour[1], file, rank);

      const newPosition = new Position("e", 3);

      const canMove = r1.canMoveTo(newPosition);

      expect(canMove).toBe(true);
    });
    test("canMoveTo - file", () => {
      const file = "d";
      const rank = 4;
      const r1 = new King(Colour[1], file, rank);

      const newPosition = new Position("e", 4);

      const canMove = r1.canMoveTo(newPosition);

      expect(canMove).toBe(true);
    });
    test("canMoveTo - rank", () => {
      const file = "d";
      const rank = 4;
      const r1 = new King(Colour[1], file, rank);

      const newPosition = new Position("d", 5);

      const canMove = r1.canMoveTo(newPosition);

      expect(canMove).toBe(true);
    });
    test("!canMoveTo", () => {
      const file = "d";
      const rank = 4;
      const r1 = new King(Colour[1], file, rank);

      const newPosition = new Position("e", 7);

      const canMove = r1.canMoveTo(newPosition);

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

      const canMove = r1.canMoveTo(newPosition);

      expect(canMove).toBe(true);
    });
    test("!canMoveTo - d4", () => {
      const file = "d";
      const rank = 4;
      const r1 = new Queen(Colour[1], file, rank);

      const newPosition = new Position("h", 6);

      const canMove = r1.canMoveTo(newPosition);

      expect(canMove).toBe(false);
    });
    test("canMoveTo", () => {
      const file = "a";
      const rank = 2;
      const r1 = new Queen(Colour[1], file, rank);

      const newPosition = new Position("h", 2);

      const canMove = r1.canMoveTo(newPosition);

      expect(canMove).toBe(true);
    });
    test("!canMoveTo", () => {
      const file = "a";
      const rank = 2;
      const r1 = new Queen(Colour[1], file, rank);

      const newPosition = new Position("h", 3);

      const canMove = r1.canMoveTo(newPosition);

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

    const isPieceInTheWay = game.isPieceInTheWay(bishop, newPosition);
    expect(isPieceInTheWay).toBe(true);
  });
  test("isPieceInTheWay - rook - rank", () => {
    const game = new Game();
    const pieces = game.getPieces();
    const rook = pieces.Ra1;

    const newPosition = new Position("a", 3);

    const isPieceInTheWay = game.isPieceInTheWay(rook, newPosition);

    expect(isPieceInTheWay).toBe(true);
  });
  test("isPieceInTheWay - rook - file", () => {
    const game = new Game();
    const pieces = game.getPieces();
    const rook = pieces.Ra1;

    const newPosition = new Position("c", 1);

    const isPieceInTheWay = game.isPieceInTheWay(rook, newPosition);

    expect(isPieceInTheWay).toBe(true);
  });
  test("!isPieceInTheWay - pawn", () => {
    const game = new Game();
    const pieces = game.getPieces();
    const pawn = pieces.Pa2;

    const newPosition = new Position("a", 3);

    const isPieceInTheWay = game.isPieceInTheWay(pawn, newPosition);

    expect(isPieceInTheWay).toBe(false);
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
      game.makeMove(move, 0);
      expect("Nb1" in pieces).toBe(false);
      expect("Nc3" in pieces).toBe(true);
      expect(pieces.Nc3.getHasMoved()).toBe(true);
    });
  });
});
