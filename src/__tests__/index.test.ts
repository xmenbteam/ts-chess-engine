import { Piece, Position } from "../classes";
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

describe("Piece Class", () => {
  test("Has position", () => {
    const file = "a";
    const rank = 2;
    const piece = new Piece(Colour[0], file, rank);

    const pos = piece.position.getPosition();
    expect(pos).toEqual({ file: "a", rank: 2 });
  });
  test("Has Colour", () => {
    const file = "a";
    const rank = 2;
    const piece = new Piece(Colour[0], file, rank);

    const colour = piece.getColour();
    expect(colour).toBe("BLACK");
  });
  test("moveTo", () => {
    const file = "a";
    const rank = 2;
    const piece = new Piece(Colour[0], file, rank);

    piece.position.setPosition("c", 5);

    expect(piece.position.getPosition()).toEqual({ file: "c", rank: 5 });
  });
  test("setIsCaptured", () => {
    const file = "a";
    const rank = 2;
    const piece = new Piece(Colour[0], file, rank);

    expect(piece.getIsCaptured()).toBe(false);
    piece.setIsCaptured();
    expect(piece.getIsCaptured()).toBe(true);
    piece.setIsCaptured();
    expect(piece.getIsCaptured()).toBe(false);
  });
  test("canMoveTo", () => {
    const file = "a";
    const rank = 2;
    const piece = new Piece(Colour[1], file, rank);

    expect(typeof piece.canMoveTo).toBe("function");
  });
});
