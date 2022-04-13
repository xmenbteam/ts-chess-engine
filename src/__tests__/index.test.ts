import { Piece, Position } from "../Pieces/Pieces";
import { Pawn } from "../Pieces/Pawn";
import { Rook } from "../Pieces/Rook";
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
    test("moveTo", () => {
      const file = "a";
      const rank = 2;
      const p1 = new Pawn(Colour[0], file, rank);

      p1.position.setPosition("c", 5);

      expect(p1.position.getPosition()).toEqual({ file: "c", rank: 5 });
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

      const moves = p1.canMoveTo();

      expect(moves.length).toBe(2);
      expect(moves).toEqual([
        { file, rank: rank + 1 },
        { file, rank: rank + 2 },
      ]);
    });
    test("not first move", () => {
      const file = "a";
      const rank = 2;
      const p1 = new Pawn(Colour[1], file, rank);

      p1.setHasmoved();

      const moves = p1.canMoveTo();

      expect(moves.length).toBe(1);
      expect(moves).toEqual([{ file, rank: rank + 1 }]);
    });
  });
  describe("Rook", () => {
    test("canMoveTo", () => {
      const file = "a";
      const rank = 2;
      const r1 = new Rook(Colour[1], file, rank);

      const moves = r1.canMoveTo();

      expect(moves.length).toBe(14);
    });
  });
});
