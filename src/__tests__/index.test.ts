import { Piece, Position } from "../Pieces/PiecesAndPosition";
import { Pawn } from "../Pieces/Pawn";
import { Rook } from "../Pieces/Rook";
import { Bishop } from "../Pieces/Bishop";
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
      expect(colour).toBe("WHITE");
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
      p1.setHasmoved();

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
      p1.setHasmoved();

      const newPositionOne = new Position("a", 5);

      const canMoveOne = p1.canMoveTo(newPositionOne);

      expect(canMoveOne).toBe(false);
    });
    test("hasMoved", () => {
      const file = "a";
      const rank = 2;
      const p1 = new Pawn(Colour[1], file, rank);

      expect(p1.hasMoved).toBe(false);

      p1.setHasmoved();

      expect(p1.hasMoved).toBe(true);
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

      p1.setHasmoved();
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
});
