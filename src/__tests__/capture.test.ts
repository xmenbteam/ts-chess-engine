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

      const isSame = Capture.isPieceSameColour(r1, r2);

      expect(isSame).toBe(true);
    });
    test("!isPieceSameColour", () => {
      const r1 = new Rook(Colour[0], "d", 3);
      const r2 = new Rook(Colour[1], "d", 6);

      const isSame = Capture.isPieceSameColour(r1, r2);

      expect(isSame).toBe(false);
    });
  });
  describe("canCapture", () => {
    test("canCapture - rook", () => {
      const r1 = new Rook(Colour[0], "d", 3);
      const r2 = new Rook(Colour[1], "d", 6);

      const canCapture = Capture.canCapture(r1, r2);

      expect(canCapture).toBe(true);
    });
    test("canCapture - bishop NE", () => {
      const capturingPiece = new Bishop(Colour[0], "b", 2);
      const targetPiece = new Rook(Colour[1], "e", 5);

      const canCapture = Capture.canCapture(capturingPiece, targetPiece);

      expect(canCapture).toBe(true);
    });
    test("canCapture - bishop NW", () => {
      const capturingPiece = new Bishop(Colour[0], "h", 2);
      const targetPiece = new Rook(Colour[1], "e", 5);

      const canCapture = Capture.canCapture(capturingPiece, targetPiece);

      expect(canCapture).toBe(true);
    });
    test("!canCapture - same colour", () => {
      const r1 = new Rook(Colour[0], "d", 3);
      const r2 = new Rook(Colour[0], "d", 6);

      const canCapture = Capture.canCapture(r1, r2);

      expect(canCapture).toBe(false);
    });
  });
  describe("pawnStuff", () => {
    describe("canPawnCapture", () => {
      test("pawnCapture", () => {
        const pawn = new Pawn(Colour[0], "c", 2);
        const rook = new Rook(Colour[1], "d", 3);

        const pawnCapture = Capture.canPawnCapture(pawn, rook);

        expect(pawnCapture).toBe(true);
      });
      test("!pawnCapture", () => {
        const pawn = new Pawn(Colour[0], "c", 2);
        const rook = new Rook(Colour[0], "d", 3);

        const pawnCapture = Capture.canPawnCapture(pawn, rook);

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

        const enPass = Capture.canEnPassant(whitePawn, blackPawn);

        expect(enPass).toBe(true);
      });
      test("enPassant - white moves two spaces", () => {
        const blackPawn = new Pawn(Colour[1], "e", 7);
        const whitePawn = new Pawn(Colour[0], "d", 2);

        blackPawn.moveTo("e", 5);
        whitePawn.moveTo("d", 4);
        whitePawn.moveTo("d", 5);

        const enPass = Capture.canEnPassant(whitePawn, blackPawn);

        expect(enPass).toBe(true);
      });
      test("!enPassant - black moves one space twice", () => {
        const blackPawn = new Pawn(Colour[1], "e", 7);
        const whitePawn = new Pawn(Colour[0], "d", 2);

        blackPawn.moveTo("e", 4);
        blackPawn.moveTo("e", 5);
        whitePawn.moveTo("d", 3);
        whitePawn.moveTo("d", 4);
        whitePawn.moveTo("d", 5);

        const enPass = Capture.canEnPassant(whitePawn, blackPawn);

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

      const gamePieces = testGame.pieces;
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

      const gamePieces = testGame.pieces;
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

      const gamePieces = testGame.pieces;
      const whiteRook = gamePieces.Rd6;
      const blackKnight = gamePieces.Nc4;

      expect(whiteRook.isCaptured).toBe(false);
      const capture = testGame.capturePiece(blackKnight, whiteRook);
      expect(capture.msg).toBe("White Rook on d6 Captured!");
      expect(whiteRook.isCaptured).toBe(true);
    });
    test("Pawn captures rook", () => {
      const pieces = [
        { piece: "e5", colour: 0 },
        { piece: "Rf6", colour: 1 },
      ];
      const testGame = new Game(pieces);

      const gamePieces = testGame.pieces;
      const whitePawn = gamePieces.Pe5;
      const blackRook = gamePieces.Rf6;

      expect(blackRook.isCaptured).toBe(false);
      const capture = testGame.capturePiece(whitePawn, blackRook);
      expect(capture.msg).toBe("Black Rook on f6 Captured!");
      expect(blackRook.isCaptured).toBe(true);
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

describe("Can piece block check", () => {
  test("canCheckBeRuined NORTH", () => {
    const pieces: CustomPieceArray = [
      { piece: "Kd7", colour: 1 },
      { piece: "Rc4", colour: 1 },
      { piece: "Rd2", colour: 0 },
    ];

    const game = new Game(pieces);

    expect(game.canCheckBeRuined(1).canPieceBlock).toBe(true);
  });
  test("canCheckBeRuined rook on h4", () => {
    const pieces: CustomPieceArray = [
      { piece: "Kd7", colour: 1 },
      { piece: "Rh4", colour: 1 },
      { piece: "Rd2", colour: 0 },
    ];

    const game = new Game(pieces);

    expect(game.canCheckBeRuined(1).canPieceBlock).toBe(true);
  });
  test("canCheckBeRuined SOUTH", () => {
    const pieces: CustomPieceArray = [
      { piece: "Kd2", colour: 1 },
      { piece: "Re4", colour: 1 },
      { piece: "Rd7", colour: 0 },
    ];

    const game = new Game(pieces);

    expect(game.canCheckBeRuined(1).canPieceBlock).toBe(true);
  });
  test("canCheckBeRuined WEST", () => {
    const pieces: CustomPieceArray = [
      { piece: "Kb5", colour: 1 },
      { piece: "Re4", colour: 1 },
      { piece: "Rg5", colour: 0 },
    ];

    const game = new Game(pieces);

    expect(game.canCheckBeRuined(1).canPieceBlock).toBe(true);
  });
  test("canCheckBeRuined EAST", () => {
    const pieces: CustomPieceArray = [
      { piece: "Kg5", colour: 1 },
      { piece: "Re4", colour: 1 },
      { piece: "Rb5", colour: 0 },
    ];

    const game = new Game(pieces);

    expect(game.canCheckBeRuined(1).canPieceBlock).toBe(true);
  });
  test("canCheckBeRuined NORTHEAST", () => {
    const pieces: CustomPieceArray = [
      { piece: "Kg7", colour: 1 },
      { piece: "Re4", colour: 1 },
      { piece: "Bb2", colour: 0 },
    ];

    const game = new Game(pieces);

    expect(game.canCheckBeRuined(1).canPieceBlock).toBe(true);
  });
  test("canCheckBeRuined NORTHWEST", () => {
    const pieces: CustomPieceArray = [
      { piece: "Kb6", colour: 1 },
      { piece: "Re4", colour: 1 },
      { piece: "Bf2", colour: 0 },
    ];

    const game = new Game(pieces);

    expect(game.canCheckBeRuined(1).canPieceBlock).toBe(true);
  });
  test("canCheckBeRuined SOUTHWEST", () => {
    const pieces: CustomPieceArray = [
      { piece: "Kb2", colour: 1 },
      { piece: "Re4", colour: 1 },
      { piece: "Bf6", colour: 0 },
    ];

    const game = new Game(pieces);

    expect(game.canCheckBeRuined(1).canPieceBlock).toBe(true);
  });
  test("canCheckBeRuined SOUTHEAST", () => {
    const pieces: CustomPieceArray = [
      { piece: "Kf6", colour: 1 },
      { piece: "Re4", colour: 1 },
      { piece: "Bb2", colour: 0 },
    ];

    const game = new Game(pieces);

    expect(game.canCheckBeRuined(1).canPieceBlock).toBe(true);
  });
});

describe("Can checking piece be taken", () => {
  test("canCheckingPieceBeTaken", () => {
    const pieces: CustomPieceArray = [
      { piece: "Kf6", colour: 1 },
      { piece: "Re2", colour: 1 },
      { piece: "Bb2", colour: 0 },
    ];

    const game = new Game(pieces);

    expect(game.canCheckBeRuined(1).canPieceBeTaken).toBe(true);
  });
});

describe("Can King move out of Check", () => {
  test("canKingMoveOutOfCheck", () => {
    const pieces: CustomPieceArray = [
      { piece: "Kb6", colour: 1 },
      { piece: "Re2", colour: 1 },
      { piece: "Bf2", colour: 0 },
    ];

    const game = new Game(pieces);

    expect(game.canKingMoveOutOfCheck(1)).toBe(true);
  });
  test("canKingMoveOutOfCheck - king in corner", () => {
    const pieces: CustomPieceArray = [
      { piece: "Kh8", colour: 1 },
      { piece: "Rh2", colour: 0 },
    ];

    const game = new Game(pieces);
    expect(game.canKingMoveOutOfCheck(1)).toBe(true);
  });
  test("canKingMoveOutOfCheck - king in middle of board, more complex", () => {
    const pieces: CustomPieceArray = [
      { piece: "Kd5", colour: 1 },
      { piece: "Rd2", colour: 0 },
      { piece: "Bg2", colour: 0 },
    ];

    const game = new Game(pieces);
    expect(game.canKingMoveOutOfCheck(1)).toBe(true);
  });
  test("!canKingMoveOutOfCheck", () => {
    const pieces: CustomPieceArray = [
      { piece: "Ka6", colour: 1 },
      { piece: "Ra1", colour: 0 },
      { piece: "Qb1", colour: 0 },
    ];

    const game = new Game(pieces);

    expect(game.canKingMoveOutOfCheck(1)).toBe(false);
  });
});

describe("Checkmate", () => {
  test("!isKingInCheckMate - king in corner", () => {
    const pieces: CustomPieceArray = [
      { piece: "Kh8", colour: 1 },
      { piece: "Rh2", colour: 0 },
    ];

    const game = new Game(pieces);
    expect(game.isKingInCheck(1)).toBe(true);
    expect(game.isKingInCheckMate(1)).toBe(false);
  });
  test("isKingInCheckMate - king in corner", () => {
    const pieces: CustomPieceArray = [
      { piece: "Kh8", colour: 1 },
      { piece: "Rh2", colour: 0 },
      { piece: "Qg2", colour: 0 },
    ];

    const game = new Game(pieces);

    expect(game.isKingInCheckMate(1)).toBe(true);
  });
});
