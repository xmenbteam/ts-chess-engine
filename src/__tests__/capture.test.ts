import { Rook } from "../Classes/PieceClasses/Rook";
import { Colour, CustomPieceArray } from "../Types";
import { Capture } from "../Classes/CaptureClasses";
import { Pawn } from "../Classes/PieceClasses/Pawn";
import { Bishop } from "../Classes/PieceClasses/Bishop";
import { Game } from "../Game";

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
  describe("pawnStuff", () => {
    describe("canPawnCapture", () => {
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
    describe("canEnPassant", () => {
      test("enPassant", () => {
        const blackPawn = new Pawn(Colour[1], "e", 7);
        const whitePawn = new Pawn(Colour[0], "d", 2);

        blackPawn.moveTo("e", 5);
        whitePawn.moveTo("d", 3);
        whitePawn.moveTo("d", 4);
        whitePawn.moveTo("d", 5);

        const positions = ["e5", "d5"];

        const enPass = new Capture(
          whitePawn,
          blackPawn,
          positions
        ).canEnPassant();

        expect(enPass).toBe(true);
      });
      test("!enPassant - white moves two spaces", () => {
        const blackPawn = new Pawn(Colour[1], "e", 7);
        const whitePawn = new Pawn(Colour[0], "d", 2);

        blackPawn.moveTo("e", 5);
        whitePawn.moveTo("d", 4);
        whitePawn.moveTo("d", 5);

        const positions = ["e5", "d5"];

        const enPass = new Capture(
          whitePawn,
          blackPawn,
          positions
        ).canEnPassant();

        expect(enPass).toBe(false);
      });
      test("!enPassant - black moves one space twice", () => {
        const blackPawn = new Pawn(Colour[1], "e", 7);
        const whitePawn = new Pawn(Colour[0], "d", 2);

        blackPawn.moveTo("e", 4);
        blackPawn.moveTo("e", 5);
        whitePawn.moveTo("d", 3);
        whitePawn.moveTo("d", 4);
        whitePawn.moveTo("d", 5);

        const positions = ["e5", "d5"];

        const enPass = new Capture(
          whitePawn,
          blackPawn,
          positions
        ).canEnPassant();

        expect(enPass).toBe(false);
      });
    });
  });
  describe("Capturing pieces", () => {
    test("Rook captures rook", () => {
      const pieces = [
        { piece: "Rd2", colour: 1 },
        { piece: "Rd6", colour: 0 },
      ];
      const testGame = new Game(pieces);

      const gamePieces = testGame.getPieces();
      const whiteRook = gamePieces.Rd6;
      const blackRook = gamePieces.Rd2;

      expect(whiteRook.isCaptured).toBe(false);
      const capture = testGame.capturePiece(blackRook, whiteRook);
      expect(capture.msg).toBe("White Rook on d6 Captured!");
      expect(whiteRook.isCaptured).toBe(true);
    });
    test("Bishop captures rook", () => {
      const pieces = [
        { piece: "Ba3", colour: 1 },
        { piece: "Rd6", colour: 0 },
      ];
      const testGame = new Game(pieces);

      const gamePieces = testGame.getPieces();
      const whiteRook = gamePieces.Rd6;
      const blackBishop = gamePieces.Ba3;

      expect(whiteRook.isCaptured).toBe(false);
      const capture = testGame.capturePiece(blackBishop, whiteRook);
      expect(capture.msg).toBe("White Rook on d6 Captured!");
      expect(whiteRook.isCaptured).toBe(true);
    });
    test("Knight captures rook", () => {
      const pieces = [
        { piece: "Nc4", colour: 1 },
        { piece: "Rd6", colour: 0 },
      ];
      const testGame = new Game(pieces);

      const gamePieces = testGame.getPieces();
      const whiteRook = gamePieces.Rd6;
      const blackKnight = gamePieces.Nc4;

      expect(whiteRook.isCaptured).toBe(false);
      const capture = testGame.capturePiece(blackKnight, whiteRook);
      expect(capture.msg).toBe("White Rook on d6 Captured!");
      expect(whiteRook.isCaptured).toBe(true);
      expect(testGame.getAllPositions()).toEqual(["d6"]);
    });
    test("Pawn captures rook", () => {
      const pieces = [
        { piece: "e5", colour: 0 },
        { piece: "Rf6", colour: 1 },
      ];
      const testGame = new Game(pieces);

      const gamePieces = testGame.getPieces();
      const whitePawn = gamePieces.Pe5;
      const blackRook = gamePieces.Rf6;

      expect(blackRook.isCaptured).toBe(false);
      const capture = testGame.capturePiece(whitePawn, blackRook);
      expect(capture.msg).toBe("Black Rook on f6 Captured!");
      expect(blackRook.isCaptured).toBe(true);
      const pos = testGame.getAllPositions();
      expect(pos).toEqual(["f6"]);
    });
  });
});

describe("Check", () => {
  test("is king in check", () => {
    const pieces: CustomPieceArray = [
      { piece: "Kd7", colour: 1 },
      { piece: "Rd2", colour: 0 },
    ];

    const game = new Game(pieces);

    expect(game.isKingInCheck(1)).toBe(true);
  });
  test("!is king in check", () => {
    const pieces: CustomPieceArray = [
      { piece: "Kd7", colour: 1 },
      { piece: "Re2", colour: 0 },
    ];

    const game = new Game(pieces);

    expect(game.isKingInCheck(1)).toBe(false);
  });
});

// describe("Checkmate", () => {
//   test("isKingInCheckMate", () => {
//     const pieces: CustomPieceArray = [
//       { piece: "Kh7", colour: 1 },
//       { piece: "Rh2", colour: 0 },
//       { piece: "Qg2", colour: 0 },
//     ];

//     const game = new Game(pieces);

//     expect(game.isKingInCheckMate(1)).toBe(true);
//   });
// });
