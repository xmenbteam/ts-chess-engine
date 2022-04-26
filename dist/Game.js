"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Bishop_1 = require("./Pieces/Bishop");
const King_1 = require("./Pieces/King");
const Knight_1 = require("./Pieces/Knight");
const Pawn_1 = require("./Pieces/Pawn");
const PiecesAndPosition_1 = require("./Pieces/PiecesAndPosition");
const Queen_1 = require("./Pieces/Queen");
const Rook_1 = require("./Pieces/Rook");
const Types_1 = require("./Types");
const utils_1 = require("./utils/utils");
class Game {
    constructor() {
        this.turnCount = 0;
        this.pieces = Game.makePieces();
    }
    static makePieces() {
        const pieces = {
            Pa2: new Pawn_1.Pawn(Types_1.Colour[0], "a", 2),
            Pb2: new Pawn_1.Pawn(Types_1.Colour[0], "b", 2),
            Pc2: new Pawn_1.Pawn(Types_1.Colour[0], "c", 2),
            Pd2: new Pawn_1.Pawn(Types_1.Colour[0], "d", 2),
            Pe2: new Pawn_1.Pawn(Types_1.Colour[0], "e", 2),
            Pf2: new Pawn_1.Pawn(Types_1.Colour[0], "f", 2),
            Pg2: new Pawn_1.Pawn(Types_1.Colour[0], "g", 2),
            Ph2: new Pawn_1.Pawn(Types_1.Colour[0], "h", 2),
            Ra1: new Rook_1.Rook(Types_1.Colour[0], "a", 1),
            Nb1: new Knight_1.Knight(Types_1.Colour[0], "b", 1),
            Bc1: new Bishop_1.Bishop(Types_1.Colour[0], "c", 1),
            Qd1: new Queen_1.Queen(Types_1.Colour[0], "d", 1),
            Ke1: new King_1.King(Types_1.Colour[0], "e", 1),
            Bf1: new Bishop_1.Bishop(Types_1.Colour[0], "f", 1),
            Ng1: new Knight_1.Knight(Types_1.Colour[0], "g", 1),
            Rh1: new Rook_1.Rook(Types_1.Colour[0], "h", 1),
            Pa7: new Pawn_1.Pawn(Types_1.Colour[1], "a", 7),
            Pb7: new Pawn_1.Pawn(Types_1.Colour[1], "b", 7),
            Pc7: new Pawn_1.Pawn(Types_1.Colour[1], "c", 7),
            Pd7: new Pawn_1.Pawn(Types_1.Colour[1], "d", 7),
            Pe7: new Pawn_1.Pawn(Types_1.Colour[1], "e", 7),
            Pf7: new Pawn_1.Pawn(Types_1.Colour[1], "f", 7),
            Pg7: new Pawn_1.Pawn(Types_1.Colour[1], "g", 7),
            Ph7: new Pawn_1.Pawn(Types_1.Colour[1], "h", 7),
            Ra8: new Rook_1.Rook(Types_1.Colour[1], "a", 8),
            Nb8: new Knight_1.Knight(Types_1.Colour[1], "b", 8),
            Bc8: new Bishop_1.Bishop(Types_1.Colour[1], "c", 8),
            Qd8: new Queen_1.Queen(Types_1.Colour[1], "d", 8),
            Ke8: new King_1.King(Types_1.Colour[1], "e", 8),
            Bf8: new Bishop_1.Bishop(Types_1.Colour[1], "f", 8),
            Ng8: new Knight_1.Knight(Types_1.Colour[1], "g", 8),
            Rh8: new Rook_1.Rook(Types_1.Colour[1], "h", 8),
        };
        return pieces;
    }
    getPieces() {
        return this.pieces;
    }
    getColourTurn() {
        return this.turnCount % 2 === 0 ? Types_1.Colour[0] : Types_1.Colour[1];
    }
    incTurnCount() {
        this.turnCount++;
    }
    isPieceThere(file, rank) {
        for (let piece in this.pieces) {
            const rankCheck = this.pieces[piece].position.getPosition().rank === rank;
            const fileCheck = this.pieces[piece].position.getPosition().file === file;
            if (fileCheck && rankCheck)
                return true;
        }
        return false;
    }
    isPieceSameColour(pieceOne, pieceTwo) {
        const p1Colour = pieceOne.getColour();
        const p2Colour = pieceTwo.getColour();
        return p1Colour === p2Colour ? true : false;
    }
    getAllPositions() {
        return Object.values(this.getPieces()).reduce((array, piece) => {
            array.push(`${piece.position.getPosition().file}${piece.position.getPosition().rank}`);
            return array;
        }, []);
    }
    // castle(colour: number) {
    //   const pieceObj: { [key: string]: Piece } = this.getPieces();
    //   const oldKingPos = colour === 0 ? "Ke1" : "Ke8";
    //   const oldRookPos = colour === 0 ? "Rh1" : "Rh8";
    //   const newKingFile = "g";
    //   const newRookFile = "f";
    //   const rank = colour === 0 ? 1 : 8;
    //   const newKingPos = new Position(newKingFile, rank);
    //   const newRookPos = new Position(newRookFile, rank);
    //   const hasNotMoved =
    //     !pieceObj[oldKingPos].getHasMoved() &&
    //     !pieceObj[oldRookPos].getHasMoved();
    //   const nothingInTheWay =
    //     !this.isPieceInTheWay(pieceObj[oldKingPos], newKingPos) &&
    //     !this.isPieceInTheWay(pieceObj[oldRookPos], newRookPos);
    //   try {
    //     if (hasNotMoved && nothingInTheWay) {
    //       pieceObj[oldKingPos].setHasMoved();
    //       pieceObj[oldKingPos].position.setPosition(newKingFile, rank);
    //       pieceObj[`K${newKingFile}${rank}`] = pieceObj[oldKingPos];
    //       delete pieceObj[oldKingPos];
    //       pieceObj[oldRookPos].setHasMoved();
    //       pieceObj[oldRookPos].position.setPosition(newRookFile, rank);
    //       pieceObj[`R${newRookFile}${rank}`] = pieceObj[oldRookPos];
    //       delete pieceObj[oldRookPos];
    //     }
    //     return { msg: `${Colour[colour]} castled Kingside!` };
    //   } catch (err) {
    //     return { msg: "Failed to castle kingside!" };
    //   }
    // }
    makeMove(move, colour) {
        const pieceObj = this.getPieces();
        const pieceArray = Object.entries(pieceObj);
        let flag = "";
        if (utils_1.pawnTest.test(move))
            move = `P${move}`;
        // if (move === "0-0") return this.castle(colour);
        const f = move.match(utils_1.fileReg)[0];
        const r = move.match(utils_1.rankReg)[0];
        const pos = new PiecesAndPosition_1.Position(f, Number(r));
        const piecesThatCanMove = pieceArray.reduce((array, piece) => {
            const [piecePos, p] = piece;
            const m = p.canMoveTo(pos, this.getAllPositions());
            const c = p.getColour() === Types_1.Colour[colour];
            const n = piecePos[0] === move[0];
            // if (piecePos === "Bc1") console.log({ move, piecePos, m, c, w, n });
            if (m && c && n)
                array.push(piecePos);
            return array;
        }, []);
        // console.log({ move, piecesThatCanMove });
        try {
            const piece = piecesThatCanMove[0];
            flag = piece[0];
            if (!pieceObj[piece].getHasMoved())
                pieceObj[piece].setHasMoved();
            pieceObj[piece].position.setPosition(f, Number(r));
            pieceObj[`${flag}${f}${r}`] = pieceObj[piece];
            delete pieceObj[piece];
            return { msg: "Success!" };
        }
        catch (err) {
            console.log({ err, move });
            return { msg: "Fail!", err };
        }
    }
}
exports.Game = Game;
