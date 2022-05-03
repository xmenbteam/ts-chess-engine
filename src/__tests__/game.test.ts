import { Position } from "../Classes/PieceClasses/PiecesAndPosition";

import { Game } from "../Game";
import { CustomPieceArray } from "../Types";

describe("Standard Game", () => {
  test("Has a turnCount/white goes first", () => {
    const game = new Game();

    expect(game.isWhiteMove).toBe(true);
    game.isWhiteMove = false;
    expect(game.isWhiteMove).toBe(false);
    game.isWhiteMove = true;
    expect(game.isWhiteMove).toBe(true);
  });
  test("isPieceThere", () => {
    const game = new Game();
    const pos1 = new Position("e", 7);
    const pos2 = new Position("f", 6);

    expect(game.isPieceThere(pos1)).toBe(true);
    expect(game.isPieceThere(pos2)).toBe(false);
  });

  describe("getPiece", () => {
    test("gets pieces from move", () => {
      const game = new Game();

      const pos = new Position("e", 4);
      const move = "Pe4";
      const colour = 0;

      const piece = game.getPiece(pos, move, colour);
      const pieceArray = Object.entries(piece);
      expect(pieceArray.length).toBe(1);
      expect(pieceArray[0][0]).toBe("Pe2");
      expect(pieceArray[0][1].position.position).toEqual({
        file: "e",
        rank: 2,
      });
    });
    test("No pieces can move there", () => {
      const game = new Game();

      const pos = new Position("c", 6);
      const move = "Pc6";
      const colour = 0;

      const piece = game.getPiece(pos, move, colour);
      const pieceArray = Object.entries(piece);
      expect(piece).toEqual({});
      expect(pieceArray.length).toBe(0);
    });
    test("One Piece - Qe4", () => {
      const pieces = [{ piece: "Qd4", colour: 1 }];
      const game = new Game(pieces);

      const pos = new Position("e", 4);
      const move = "Qe4";
      const colour = 1;

      const piece = game.getPiece(pos, move, colour);
      const pieceArray = Object.entries(piece);
      expect(pieceArray.length).toBe(1);
      expect(pieceArray[0][0]).toBe("Qd4");
      expect(pieceArray[0][1].position.position).toEqual({
        file: "d",
        rank: 4,
      });
    });
    test("Two possible pieces - Qe4, Nd2 - e4", () => {
      const pieces = [
        { piece: "Qd4", colour: 1 },
        { piece: "Nd2", colour: 1 },
      ];
      const game = new Game(pieces);

      const pos = new Position("e", 4);
      const move = "Qe4";
      const colour = 1;

      const piece = game.getPiece(pos, move, colour);
      const pieceArray = Object.entries(piece);
      expect(pieceArray.length).toBe(1);
      expect(pieceArray[0][0]).toBe("Qd4");
      expect(pieceArray[0][1].position.position).toEqual({
        file: "d",
        rank: 4,
      });
    });
    test("Two of the same piece, same RANK - Nb3, Ne6 - c5", () => {
      const pieces = [
        { piece: "Nb3", colour: 1 },
        { piece: "Nd3", colour: 1 },
      ];
      const game = new Game(pieces);

      const pos = new Position("c", 5);
      const move = "Nbc5";
      const colour = 1;

      const piece = game.getPiece(pos, move, colour);
      const pieceArray = Object.entries(piece);
      expect(pieceArray.length).toBe(1);
      expect(pieceArray[0][0]).toBe("Nb3");
      expect(pieceArray[0][1].position.position).toEqual({
        file: "b",
        rank: 3,
      });
    });
    test("Two of the same piece, same FILE - Nb3, Ne6 - c5", () => {
      const pieces = [
        { piece: "Nd3", colour: 1 },
        { piece: "Nd7", colour: 1 },
      ];
      const game = new Game(pieces);

      const pos = new Position("c", 5);
      const move = "N7c5";
      const colour = 1;

      const piece = game.getPiece(pos, move, colour);
      const pieceArray = Object.entries(piece);
      expect(pieceArray.length).toBe(1);
      expect(pieceArray[0][0]).toBe("Nd7");
      expect(pieceArray[0][1].position.position).toEqual({
        file: "d",
        rank: 7,
      });
    });
  });
  describe("Custom Game", () => {
    test("spawns a pawn", () => {
      const piecesArray: CustomPieceArray = [{ piece: "d3", colour: 0 }];
      const game = new Game(piecesArray);

      const pieces = game.pieces;
      expect(pieces.Pd3.constructor.name).toBe("Pawn");
    });
    test("spawns a rook", () => {
      const piecesArray: CustomPieceArray = [{ piece: "Rd3", colour: 0 }];
      const game = new Game(piecesArray);

      const pieces = game.pieces;
      expect(pieces.Rd3.constructor.name).toBe("Rook");
    });
    test("spawns a Bishop", () => {
      const piecesArray: CustomPieceArray = [{ piece: "Bd3", colour: 0 }];
      const game = new Game(piecesArray);

      const pieces = game.pieces;
      expect(pieces.Bd3.constructor.name).toBe("Bishop");
    });
    test("spawns a Knight", () => {
      const piecesArray: CustomPieceArray = [{ piece: "Nd3", colour: 0 }];
      const game = new Game(piecesArray);

      const pieces = game.pieces;
      expect(pieces.Nd3.constructor.name).toBe("Knight");
    });
    test("spawns a Queen", () => {
      const piecesArray: CustomPieceArray = [{ piece: "Qd3", colour: 0 }];
      const game = new Game(piecesArray);

      const pieces = game.pieces;
      expect(pieces.Qd3.constructor.name).toBe("Queen");
    });
    test("spawns a King", () => {
      const piecesArray: CustomPieceArray = [{ piece: "Kd3", colour: 0 }];
      const game = new Game(piecesArray);

      const pieces = game.pieces;
      expect(pieces.Kd3.constructor.name).toBe("King");
    });
    test("spawns a few", () => {
      const piecesArray: CustomPieceArray = [
        { piece: "Kd3", colour: 0 },
        { piece: "Ke3", colour: 0 },
      ];
      const game = new Game(piecesArray);

      const pieces = game.pieces;
      expect(pieces.Kd3.constructor.name).toBe("King");
      expect(pieces.Ke3.constructor.name).toBe("King");
    });
    test("Doesn't spawn on same square", () => {
      const piecesArray: CustomPieceArray = [
        { piece: "Kd3", colour: 0 },
        { piece: "Kd3", colour: 0 },
        { piece: "Kd3", colour: 0 },
      ];
      const game = new Game(piecesArray);

      const pieces = game.pieces;

      expect(pieces.Kd3.constructor.name).toBe("King");
      expect(pieces.error1.constructor.name).toBe("ErrorPiece");
      expect(pieces.error2.constructor.name).toBe("ErrorPiece");
    });
    test("Doesn't spawn on same square different pieces", () => {
      const piecesArray: CustomPieceArray = [
        { piece: "Kd3", colour: 0 },
        { piece: "Bd3", colour: 0 },
        { piece: "Nd3", colour: 0 },
      ];
      const game = new Game(piecesArray);

      const pieces = game.pieces;

      expect(pieces.Kd3.constructor.name).toBe("King");
      expect(pieces.error1.constructor.name).toBe("ErrorPiece");
      expect(pieces.error2.constructor.name).toBe("ErrorPiece");
    });
  });

  describe.only("makeMove", () => {
    test.only("Move one piece - e2 - e4", () => {
      const game = new Game();
      const move = "e4";
      const pieces = game.pieces;
      const moveMsg = game.makeMove(move, 0);
      console.log({ moveMsg });
      expect("Pe4" in pieces).toBe(true);
      expect("Pe2" in pieces).toBe(false);
    });
    test("Move piece - e2 - e4", () => {
      const game = new Game();
      const move = "e4";
      const pieces = game.pieces;

      game.makeMove(move, 0);
      expect("Pe4" in pieces).toBe(true);
      expect("Pe2" in pieces).toBe(false);
    });
    test("Move named piece - Nb1 - Nc3", () => {
      const game = new Game();
      const move = "Nc3";
      const pieces = game.pieces;
      expect("Nb1" in pieces).toBe(true);
      const moveTime = game.makeMove(move, 0);
      expect(moveTime.msg).toBe("Knight moved to c3!");
      expect("Nb1" in pieces).toBe(false);
      expect("Nc3" in pieces).toBe(true);
    });
    test("Cannot move rook", () => {
      const game = new Game();
      const move = "Ra3";
      const pieces = game.pieces;
      console.log(game.pieces.Ra1);
      const moveTime = game.makeMove(move, 0);
      console.log(game.pieces.Ra3);
      console.log(moveTime);
    });
  });

  //   xdescribe("castling", () => {
  //     describe("kingSide", () => {
  //       test("White castles kingside", () => {
  //         const game = new Game();
  //         const pieces = game.pieces
  //         const moves = ["g3", "Bg2", "Nf3"];
  //         moves.forEach((move) => {
  //           game.makeMove(move, 0);
  //         });

  //         const castleKing = "0-0";
  //         const castle = game.makeMove(castleKing, 0);

  //         expect("Kg1" in pieces).toBe(true);
  //         expect("Rf1" in pieces).toBe(true);
  //         expect(pieces.Kg1.hasMoved).toBe(true);
  //         expect(pieces.Rf1.hasMoved).toBe(true);
  //         expect(castle.msg).toBe("White castled Kingside!");
  //       });
  //       test("!White castles kingside", () => {
  //         const game = new Game();
  //         const pieces = game.pieces
  //         const moves = ["g3", "Nf3"];
  //         moves.forEach((move) => {
  //           game.makeMove(move, 0);
  //         });

  //         const castleKing = "0-0";
  //         const castle = game.makeMove(castleKing, 0);
  //         expect("Kg1" in pieces).toBe(false);
  //         expect("Rf1" in pieces).toBe(false);
  //         expect(pieces.Ke1.hasMoved).toBe(false);
  //         expect(pieces.Rh1.hasMoved).toBe(false);
  //         expect(castle.msg).toBe("White Failed to castle Kingside!");
  //       });
  //       test("Black castles kingside", () => {
  //         const game = new Game();
  //         const pieces = game.pieces
  //         const moves = ["e6", "Be7", "Nf6"];
  //         moves.forEach((move) => {
  //           game.makeMove(move, 1);
  //         });

  //         const castleKing = "0-0";
  //         const castle = game.makeMove(castleKing, 1);

  //         expect("Kg8" in pieces).toBe(true);
  //         expect("Rf8" in pieces).toBe(true);
  //         expect(pieces.Kg8.hasMoved).toBe(true);
  //         expect(pieces.Rf8.hasMoved).toBe(true);
  //         expect(castle.msg).toBe("Black castled Kingside!");
  //       });
  //     });
  //     describe("queenSide", () => {
  //       test("White castles queenside", () => {
  //         const game = new Game();
  //         const pieces = game.pieces
  //         const moves = ["b3", "c3", "Na3", "Bb2", "Qc2"];
  //         moves.forEach((move) => game.makeMove(move, 0));

  //         const castleQueen = "0-0-0";
  //         const castle = game.makeMove(castleQueen, 0);

  //         expect("Kc1" in pieces).toBe(true);
  //         expect("Rd1" in pieces).toBe(true);
  //         expect(pieces.Kc1.hasMoved).toBe(true);
  //         expect(pieces.Rd1.hasMoved).toBe(true);
  //         expect(castle.msg).toBe("White castled Queenside!");
  //       });
  //       test("!White castles queenside", () => {
  //         const game = new Game();
  //         const pieces = game.pieces
  //         const moves = ["b3", "c3", "Na3", "Qc2"];
  //         moves.forEach((move) => {
  //           game.makeMove(move, 0);
  //         });

  //         const castleQueen = "0-0-0";
  //         const castle = game.makeMove(castleQueen, 0);
  //         expect("Kc1" in pieces).toBe(false);
  //         expect("Rd1" in pieces).toBe(false);
  //         expect(pieces.Ke1.hasMoved).toBe(false);
  //         expect(pieces.Rh1.hasMoved).toBe(false);
  //         expect(castle.msg).toBe("White Failed to castle Queenside!");
  //       });
  //       test("Black castles queenside", () => {
  //         const game = new Game();
  //         const pieces = game.pieces
  //         const moves = ["b6", "c6", "Na6", "Bb7", "Qc7"];
  //         moves.forEach((move) => {
  //           game.makeMove(move, 1);
  //         });

  //         const castleQueen = "0-0-0";
  //         const castle = game.makeMove(castleQueen, 1);

  //         expect("Kc8" in pieces).toBe(true);
  //         expect("Rd8" in pieces).toBe(true);
  //         expect(pieces.Kc8.hasMoved).toBe(true);
  //         expect(pieces.Rd8.hasMoved).toBe(true);
  //         expect(castle.msg).toBe("Black castled Queenside!");
  //       });
  //     });
  //   });
  //   describe("getAllPositions", () => {
  //     test("Get all pieces", () => {
  //       const piecesArray: CustomPieceArray = [
  //         { piece: "Kd3", colour: 0 },
  //         { piece: "Ke3", colour: 0 },
  //       ];
  //       const game = new Game(piecesArray);
  //       expect(game.getAllPositions()).toEqual(["d3", "e3"]);
  //     });
  //     test("Get all UNCAPTURED pieces", () => {
  //       const piecesArray: CustomPieceArray = [
  //         { piece: "Kd3", colour: 0 },
  //         { piece: "Ke3", colour: 0 },
  //       ];
  //       const game = new Game(piecesArray);
  //       const pieces = game.pieces

  //       pieces.Kd3.isCaptured = true;
  //       expect(game.getAllPositions()).toEqual(["e3"]);
  //     });
  //   });

  //   xdescribe("turn", () => {
  //     test("Takes a standard chess notation", () => {
  //       const game = new Game();

  //       const move = "Nf3 a6";
  //       const turns = game.makeTurn(move);

  //       const pieces = game.getAllPositions();

  //       const expected = [
  //         { msg: "Ng1 moved to f3!" },
  //         { msg: "Pa7 moved to a6!" },
  //       ];

  //       expect(pieces.includes("f3")).toBe(true);
  //       expect(pieces.includes("a6")).toBe(true);
  //       expect(turns).toEqual(expected);
  //     });
  //   });
  // });
});
