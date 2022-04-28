import { Rook } from "../Classes/PieceClasses/Rook";
import { Colour } from "../Types";
import { Capture } from "../Classes/CaptureClasses";
import { Pawn } from "../Classes/PieceClasses/Pawn";
import { Bishop } from "../Classes/PieceClasses/Bishop";

describe("Capture", () => {
  describe("IsPieceSameColour", () => {
    test("isPieceSameColour", () => {
      const r1 = new Rook(Colour[0], "d", 3);
      const r2 = new Rook(Colour[0], "d", 6);
      const positions = ["d3", "d6"];
      const newCapture = new Capture(r1, r2, positions);

      const isSame = newCapture.isPieceSameColour();

      expect(isSame).toBe(true);
    });
    test("!isPieceSameColour", () => {
      const r1 = new Rook(Colour[0], "d", 3);
      const r2 = new Rook(Colour[1], "d", 6);
      const positions = ["d3", "d6"];
      const newCapture = new Capture(r1, r2, positions);

      const isSame = newCapture.isPieceSameColour();

      expect(isSame).toBe(false);
    });
  });
  describe("canCapture", () => {
    test("canCapture - rook", () => {
      const r1 = new Rook(Colour[0], "d", 3);
      const r2 = new Rook(Colour[1], "d", 6);
      const positions = ["d3", "d6"];
      const canCapture = new Capture(r1, r2, positions).canCapture();

      expect(canCapture).toBe(true);
    });
    test("canCapture - bishop NE", () => {
      const capturingPiece = new Bishop(Colour[0], "b", 2);
      const targetPiece = new Rook(Colour[1], "e", 5);
      const positions = ["b2", "e5"];
      const canCapture = new Capture(
        capturingPiece,
        targetPiece,
        positions
      ).canCapture();

      expect(canCapture).toBe(true);
    });
    test("canCapture - bishop NW", () => {
      const capturingPiece = new Bishop(Colour[0], "h", 2);
      const targetPiece = new Rook(Colour[1], "e", 5);
      const positions = ["h2", "d6"];
      const canCapture = new Capture(
        capturingPiece,
        targetPiece,
        positions
      ).canCapture();

      expect(canCapture).toBe(true);
    });
    test("!canCapture - same colour", () => {
      const r1 = new Rook(Colour[0], "d", 3);
      const r2 = new Rook(Colour[0], "d", 6);
      const positions = ["d3", "d6"];
      const canCapture = new Capture(r1, r2, positions).canCapture();

      expect(canCapture).toBe(false);
    });
  });
  describe("pawnCapture", () => {
    test("pawnCapture", () => {
      const pawn = new Pawn(Colour[0], "c", 2);
      const rook = new Rook(Colour[1], "d", 3);
      const positions = ["c2", "d3"];

      const pawnCapture = new Capture(pawn, rook, positions).canPawnCapture();

      expect(pawnCapture).toBe(true);
    });
    test("!pawnCapture", () => {
      const pawn = new Pawn(Colour[0], "c", 2);
      const rook = new Rook(Colour[0], "d", 3);
      const positions = ["c2", "d3"];

      const pawnCapture = new Capture(pawn, rook, positions).canPawnCapture();

      expect(pawnCapture).toBe(false);
    });
  });
});
