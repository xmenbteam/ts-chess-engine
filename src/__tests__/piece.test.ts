import { King } from "../Classes/PieceClasses/King";
import { Pawn } from "../Classes/PieceClasses/Pawn";
import { Position } from "../Classes/PieceClasses/PiecesAndPosition";
import { Rook } from "../Classes/PieceClasses/Rook";

import { Game } from "../Game";
import { Colour } from "../Types";

describe("Piece subclasses", () => {
  describe("MoveCount", () => {
    test("getMoveCount", () => {
      const p1 = new Pawn(Colour[1], "a", 2);
      expect(p1.moveCount).toBe(0);
    });
    test("moveCount increments", () => {
      const p1 = new Pawn(Colour[1], "a", 2);
      const move1 = p1.moveTo("a", 3)?.moveCount;
      expect(move1).toBe(1);
      const move2 = p1.moveTo("a", 4)?.moveCount;
      expect(move2).toBe(2);
    });
  });
  describe("Pawn", () => {
    test("Properties", () => {
      const file = "a";
      const rank = 2;
      const p1 = new Pawn(Colour[1], file, rank);

      const pos = p1.position.position;
      const colour = p1.colour;
      expect(pos).toEqual({ file: "a", rank: 2 });
      expect(colour).toBe("Black");
    });
    test("setIsCaptured", () => {
      const file = "a";
      const rank = 2;
      const p1 = new Pawn(Colour[0], file, rank);

      expect(p1.isCaptured).toBe(false);
      p1.isCaptured = true;
      expect(p1.isCaptured).toBe(true);
    });
    test("canMoveTo - !hasMoved", () => {
      const pieces = [{ piece: "a2", colour: 0 }];

      const game = new Game(pieces);

      const p1 = game.pieces.Pa2;

      const newPositionOne = new Position("a", 3);
      const newPositionTwo = new Position("a", 4);

      const canMoveOne = p1.canMoveTo(newPositionOne);
      const canMoveTwo = p1.canMoveTo(newPositionTwo);

      expect(canMoveOne).toBe(true);
      expect(canMoveTwo).toBe(true);
    });
    test("canMoveTo - hasMoved", () => {
      const pieces = [{ piece: "a2", colour: 0 }];

      const game = new Game(pieces);

      const p1 = game.pieces.Pa2;
      p1.moveTo("a", 3);

      const newPositionOne = new Position("a", 4);
      const newPositionTwo = new Position("a", 5);

      const canMoveOne = p1.canMoveTo(newPositionOne);
      const canMoveTwo = p1.canMoveTo(newPositionTwo);

      expect(canMoveOne).toBe(true);
      expect(canMoveTwo).toBe(false);
    });
    test("canMoveTo - black", () => {
      const pieces = [{ piece: "c7", colour: 0 }];

      const game = new Game(pieces);
      const p1 = game.pieces.Pc7;

      const newPositionOne = new Position("c", 6);
      const newPositionTwo = new Position("c", 5);

      const canMoveOne = p1.canMoveTo(newPositionOne);
      const canMoveTwo = p1.canMoveTo(newPositionTwo);

      expect(canMoveOne).toBe(true);
      expect(canMoveTwo).toBe(true);
    });
    test("hasMoved", () => {
      const file = "a";
      const rank = 2;
      const p1 = new Pawn(Colour[1], file, rank);

      expect(p1.hasMoved).toBe(false);

      p1.hasMoved = true;

      expect(p1.hasMoved).toBe(true);
    });
  });
  describe("Rook", () => {
    test("canMoveTo - rank", () => {
      const pieces = [{ piece: "Ra1", colour: 0 }];

      const game = new Game(pieces);
      const r1 = game.pieces.Ra1;

      const newPositionOne = new Position("a", 2);

      const canMoveOne = r1.canMoveTo(newPositionOne);

      expect(canMoveOne).toBe(true);
    });
    test("canMoveTo - FILE", () => {
      const pieces = [{ piece: "Ra1", colour: 0 }];

      const game = new Game(pieces);
      const r1 = game.pieces.Ra1;

      const newPositionOne = new Position("d", 1);

      const canMoveOne = r1.canMoveTo(newPositionOne);

      expect(canMoveOne).toBe(true);
    });
    test("canMoveTo - DOWN", () => {
      const pieces = [{ piece: "Rd4", colour: 0 }];

      const game = new Game(pieces);
      const r1 = game.pieces.Rd4;

      const newPositionOne = new Position("d", 1);

      const canMoveOne = r1.canMoveTo(newPositionOne);

      expect(canMoveOne).toBe(true);
    });
    test("!canMoveTo - DIAGONAL", () => {
      const pieces = [{ piece: "Rd4", colour: 0 }];

      const game = new Game(pieces);
      const r1 = game.pieces.Rd4;

      const newPositionOne = new Position("f", 2);

      const canMoveOne = r1.canMoveTo(newPositionOne);

      expect(canMoveOne).toBe(false);
    });
    test("hasMoved", () => {
      const file = "a";
      const rank = 2;
      const r1 = new Rook(Colour[1], file, rank);

      expect(r1.hasMoved).toBe(false);

      r1.hasMoved = true;

      expect(r1.hasMoved).toBe(true);
    });
  });
  describe("Bishop", () => {
    test("canMoveTo - a1", () => {
      const pieces = [{ piece: "Ba1", colour: 0 }];

      const game = new Game(pieces);
      const r1 = game.pieces.Ba1;

      const newPositionOne = new Position("c", 3);

      const canMoveOne = r1.canMoveTo(newPositionOne);

      expect(canMoveOne).toBe(true);
    });
    test("!canMoveTo - e6", () => {
      const pieces = [{ piece: "Ba1", colour: 0 }];

      const game = new Game(pieces);
      const r1 = game.pieces.Ba1;

      const newPositionOne = new Position("e", 6);

      const canMoveOne = r1.canMoveTo(newPositionOne);

      expect(canMoveOne).toBe(false);
    });

    // test("Second Other !canMoveTo - NE", () => {
    //   const pieces = [
    //     { piece: "Rd4", colour: 0 },
    //     { piece: "Rf6", colour: 0 },
    //   ];

    //   const game = new Game(pieces);
    //   const r1 = game.pieces.Rd4;

    //   const newPositionOne = new Position("h", 8);

    //   const canMoveOne = r1.canMoveTo(newPositionOne);

    //   expect(canMoveOne).toBe(false);
    // });
    // test("!canMoveTo - northeast", () => {
    //   const pieces = [
    //     { piece: "Rd4", colour: 0 },
    //     { piece: "Rf6", colour: 0 },
    //   ];

    //   const game = new Game(pieces);
    //   const r1 = game.pieces.Rd4;

    //   const newPositionOne = new Position("g", 7);

    //   const canMoveOne = r1.canMoveTo(newPositionOne);

    //   expect(canMoveOne).toBe(false);
    // });
    test("canMoveTo - northeast", () => {
      const pieces = [{ piece: "Bd4", colour: 0 }];

      const game = new Game(pieces);
      const r1 = game.pieces.Bd4;

      const newPositionOne = new Position("g", 7);

      const canMoveOne = r1.canMoveTo(newPositionOne);

      expect(canMoveOne).toBe(true);
    });
    test("canMoveTo - southeast", () => {
      const pieces = [{ piece: "Bd4", colour: 0 }];

      const game = new Game(pieces);
      const r1 = game.pieces.Bd4;

      const newPositionOne = new Position("g", 1);

      const canMoveOne = r1.canMoveTo(newPositionOne);

      expect(canMoveOne).toBe(true);
    });
    // test("!canMoveTo - southeast", () => {
    //   const pieces = [
    //     { piece: "Rd4", colour: 0 },
    //     { piece: "Rf2", colour: 0 },
    //   ];

    //   const game = new Game(pieces);
    //   const r1 = game.pieces.Rd4;

    //   const newPositionOne = new Position("g", 1);

    //   const canMoveOne = r1.canMoveTo(newPositionOne);

    //   expect(canMoveOne).toBe(false);
    // });
    test("canMoveTo - southwest", () => {
      const pieces = [{ piece: "Bd4", colour: 0 }];

      const game = new Game(pieces);
      const r1 = game.pieces.Bd4;

      const newPositionOne = new Position("b", 2);

      const canMoveOne = r1.canMoveTo(newPositionOne);

      expect(canMoveOne).toBe(true);
    });
    // test("!canMoveTo - southwest", () => {
    //   const pieces = [{ piece: "Bd4", colour: 0 }];

    //   const game = new Game(pieces);
    //   const r1 = game.pieces.Bd4;

    //   const newPositionOne = new Position("b", 2);

    //   const canMoveOne = r1.canMoveTo(newPositionOne);

    //   expect(canMoveOne).toBe(false);
    // });
    test("canMoveTo - northwest", () => {
      const pieces = [{ piece: "Bd4", colour: 0 }];

      const game = new Game(pieces);
      const r1 = game.pieces.Bd4;

      const newPositionOne = new Position("a", 7);

      const canMoveOne = r1.canMoveTo(newPositionOne);

      expect(canMoveOne).toBe(true);
    });
    // test("!canMoveTo - northwest", () => {
    //   const pieces = [
    //     { piece: "Rd4", colour: 0 },
    //     { piece: "Rb6", colour: 0 },
    //   ];

    //   const game = new Game(pieces);
    //   const r1 = game.pieces.Rd4;

    //   const newPositionOne = new Position("a", 7);

    //   const canMoveOne = r1.canMoveTo(newPositionOne);

    //   expect(canMoveOne).toBe(false);
    // });
    // test("Other !canMoveTo - SW", () => {
    //   const pieces = [
    //     { piece: "Rd4", colour: 0 },
    //     { piece: "Rf6", colour: 0 },
    //   ];

    //   const game = new Game(pieces);
    //   const r1 = game.pieces.Rf6;

    //   const newPositionOne = new Position("a", 1);

    //   const canMoveOne = r1.canMoveTo(newPositionOne);

    //   expect(canMoveOne).toBe(false);
    // });
    // test("Other !canMoveTo - NW", () => {
    //   const pieces = [
    //     { piece: "Rd4", colour: 0 },
    //     { piece: "Rb6", colour: 0 },
    //   ];

    //   const game = new Game(pieces);
    //   const r1 = game.pieces.Rd4;

    //   const newPositionOne = new Position("a", 7);

    //   const canMoveOne = r1.canMoveTo(newPositionOne);

    //   expect(canMoveOne).toBe(false);
    // });
    // test("Other !canMoveTo - SE", () => {
    //   const pieces = [
    //     { piece: "Rc6", colour: 0 },
    //     { piece: "Rf3", colour: 0 },
    //   ];

    //   const game = new Game(pieces);
    //   const r1 = game.pieces.Rc6;

    //   const newPositionOne = new Position("h", 1);

    //   const canMoveOne = r1.canMoveTo(newPositionOne);

    //   expect(canMoveOne).toBe(false);
    // });
  });
  describe("Knight", () => {
    test("!canMoveTo", () => {
      const pieces = [
        { piece: "Na1", colour: 0 },
        { piece: "Nb2", colour: 0 },
      ];

      const game = new Game(pieces);
      const r1 = game.pieces.Na1;

      const newPosition = new Position("f", 3);

      const canMove = r1.canMoveTo(newPosition);

      expect(canMove).toBe(false);
    });
    test("canMoveTo - standard", () => {
      const pieces = [
        { piece: "Na1", colour: 0 },
        { piece: "Nb1", colour: 0 },
      ];

      const game = new Game(pieces);
      const r1 = game.pieces.Nb1;

      const newPosition = new Position("c", 3);

      const canMove = r1.canMoveTo(newPosition);

      expect(canMove).toBe(true);
    });
  });
  describe("King", () => {
    // describe("!Move into check", () => {
    //   test("Test", () => {
    //     const pieces = [
    //       { piece: "Kh7", colour: 1 },
    //       { piece: "Rg2", colour: 0 },
    //     ];
    //     const game = new Game(pieces);

    //     console.log("hee");
    //   });
    // });
    describe("canMoveTo", () => {
      test("canMoveTo - diagonal", () => {
        const pieces = [{ piece: "Kd4", colour: 0 }];

        const game = new Game(pieces);
        const r1 = game.pieces.Kd4;

        const newPosition = new Position("e", 3);

        const canMove = r1.canMoveTo(newPosition);

        expect(canMove).toBe(true);
      });
      test("canMoveTo - file", () => {
        const pieces = [{ piece: "Kd4", colour: 0 }];

        const game = new Game(pieces);
        const r1 = game.pieces.Kd4;

        const newPosition = new Position("e", 4);

        const canMove = r1.canMoveTo(newPosition);

        expect(canMove).toBe(true);
      });
      test("canMoveTo - rank", () => {
        const pieces = [{ piece: "Kd4", colour: 0 }];

        const game = new Game(pieces);
        const r1 = game.pieces.Kd4;
        const newPosition = new Position("d", 5);

        const canMove = r1.canMoveTo(newPosition);

        expect(canMove).toBe(true);
      });
      test("!canMoveTo - out of scope", () => {
        const pieces = [{ piece: "Kd4", colour: 0 }];

        const game = new Game(pieces);
        const r1 = game.pieces.Kd4;

        const newPosition = new Position("e", 7);

        const canMove = r1.canMoveTo(newPosition);

        expect(canMove).toBe(false);
      });
      //   test("!canMoveTo - piece to west", () => {
      //     const pieces = [
      //       { piece: "Kd4", colour: 0 },
      //       { piece: "Kc4", colour: 0 },
      //     ];

      //     const game = new Game(pieces);
      //     const r1 = game.pieces.Kd4;

      //     const newPosition = new Position("c", 4);

      //     const canMove = r1.canMoveTo(newPosition);

      //     expect(canMove).toBe(false);
      //   });
      //   test("!canMoveTo - piece to northwest", () => {
      //     const pieces = [
      //       { piece: "Ke7", colour: 0 },
      //       { piece: "Kd8", colour: 0 },
      //     ];

      //     const game = new Game(pieces);
      //     const r1 = game.pieces.Ke7;

      //     const newPosition = new Position("d", 8);

      //     const canMove = r1.canMoveTo(newPosition);

      //     expect(canMove).toBe(false);
      //   });
      //   test("!canMoveTo - piece to north", () => {
      //     const pieces = [
      //       { piece: "Ke7", colour: 0 },
      //       { piece: "Ke8", colour: 0 },
      //     ];

      //     const game = new Game(pieces);
      //     const r1 = game.pieces.Ke7;

      //     const newPosition = new Position("e", 8);

      //     const canMove = r1.canMoveTo(newPosition);

      //     expect(canMove).toBe(false);
      //   });
      //   test("!canMoveTo - piece to northeast", () => {
      //     const pieces = [
      //       { piece: "Ke7", colour: 0 },
      //       { piece: "Kf8", colour: 0 },
      //     ];

      //     const game = new Game(pieces);
      //     const r1 = game.pieces.Ke7;
      //     const newPosition = new Position("f", 8);

      //     const canMove = r1.canMoveTo(newPosition);

      //     expect(canMove).toBe(false);
      //   });
      //   test("!canMoveTo - piece to east", () => {
      //     const pieces = [
      //       { piece: "Ke7", colour: 0 },
      //       { piece: "Kf7", colour: 0 },
      //     ];

      //     const game = new Game(pieces);
      //     const r1 = game.pieces.Ke7;

      //     const newPosition = new Position("f", 7);

      //     const canMove = r1.canMoveTo(newPosition);

      //     expect(canMove).toBe(false);
      //   });
      //   test("!canMoveTo - piece to southeast", () => {
      //     const pieces = [
      //       { piece: "Ke7", colour: 0 },
      //       { piece: "Kf6", colour: 0 },
      //     ];

      //     const game = new Game(pieces);
      //     const r1 = game.pieces.Ke7;

      //     const newPosition = new Position("f", 6);

      //     const canMove = r1.canMoveTo(newPosition);

      //     expect(canMove).toBe(false);
      //   });
      //   test("!canMoveTo - piece to south", () => {
      //     const pieces = [
      //       { piece: "Ke7", colour: 0 },
      //       { piece: "Ke6", colour: 0 },
      //     ];

      //     const game = new Game(pieces);
      //     const r1 = game.pieces.Ke7;

      //     const newPosition = new Position("e", 6);

      //     const canMove = r1.canMoveTo(newPosition);

      //     expect(canMove).toBe(false);
      //   });
      //   test("!canMoveTo - piece to southwest", () => {
      //     const pieces = [
      //       { piece: "Ke7", colour: 0 },
      //       { piece: "Kd6", colour: 0 },
      //     ];

      //     const game = new Game(pieces);
      //     const r1 = game.pieces.Ke7;

      //     const newPosition = new Position("d", 6);

      //     const canMove = r1.canMoveTo(newPosition);

      //     expect(canMove).toBe(false);
      //   });
    });
    test("hasMoved", () => {
      const file = "a";
      const rank = 2;
      const r1 = new King(Colour[1], file, rank);

      expect(r1.hasMoved).toBe(false);

      r1.hasMoved = true;

      expect(r1.hasMoved).toBe(true);
    });
  });
  describe("Queen", () => {
    test("canMoveTo - d4", () => {
      const pieces = [{ piece: "Qd4", colour: 0 }];

      const game = new Game(pieces);
      const r1 = game.pieces.Qd4;

      const newPosition = new Position("e", 3);

      const canMove = r1.canMoveTo(newPosition);

      expect(canMove).toBe(true);
    });
    test("canMoveTo - d4 - c4", () => {
      const pieces = [{ piece: "Qd4", colour: 0 }];

      const game = new Game(pieces);
      const r1 = game.pieces.Qd4;

      const newPosition = new Position("c", 4);

      const canMove = r1.canMoveTo(newPosition);

      expect(canMove).toBe(true);
    });
    // test("!canMoveTo - d4", () => {
    //   const pieces = [
    //     { piece: "Qd4", colour: 0 },
    //     { piece: "Qd2", colour: 0 },
    //   ];

    //   const game = new Game(pieces);
    //   const r1 = game.pieces.Qd4;

    //   const newPosition = new Position("d", 1);

    //   const canMove = r1.canMoveTo(newPosition);

    //   expect(canMove).toBe(false);
    // });
    // test("!canMoveTo  - diagonal", () => {
    //   const pieces = [
    //     { piece: "Qd4", colour: 0 },
    //     { piece: "Qd2", colour: 0 },
    //   ];

    //   const game = new Game(pieces);
    //   const r1 = game.pieces.Qd4;

    //   const newPosition = new Position("b", 2);

    //   const canMove = r1.canMoveTo(newPosition);

    //   expect(canMove).toBe(true);
    // });
  });
});
