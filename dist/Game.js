"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Bishop_1 = require("./Pieces/Bishop");
const King_1 = require("./Pieces/King");
const Knight_1 = require("./Pieces/Knight");
const Pawn_1 = require("./Pieces/Pawn");
const Queen_1 = require("./Pieces/Queen");
const Rook_1 = require("./Pieces/Rook");
const Types_1 = require("./Types");
class Game {
    constructor() {
        this.turnCount = 0;
    }
    static makePieces() {
        const pieces = {
            a2: new Pawn_1.Pawn(Types_1.Colour[0], "a", 2),
            b2: new Pawn_1.Pawn(Types_1.Colour[0], "b", 2),
            c2: new Pawn_1.Pawn(Types_1.Colour[0], "c", 2),
            d2: new Pawn_1.Pawn(Types_1.Colour[0], "d", 2),
            e2: new Pawn_1.Pawn(Types_1.Colour[0], "e", 2),
            f2: new Pawn_1.Pawn(Types_1.Colour[0], "f", 2),
            g2: new Pawn_1.Pawn(Types_1.Colour[0], "g", 2),
            Rw1: new Rook_1.Rook(Types_1.Colour[0], "a", 1),
            Nw1: new Knight_1.Knight(Types_1.Colour[0], "b", 1),
            Bw1: new Bishop_1.Bishop(Types_1.Colour[0], "c", 1),
            Qw: new Queen_1.Queen(Types_1.Colour[0], "d", 1),
            Kw: new King_1.King(Types_1.Colour[0], "e", 1),
            Bw2: new Bishop_1.Bishop(Types_1.Colour[0], "f", 1),
            Nw2: new Knight_1.Knight(Types_1.Colour[0], "g", 1),
            Rw2: new Rook_1.Rook(Types_1.Colour[0], "h", 1),
            a7: new Pawn_1.Pawn(Types_1.Colour[1], "a", 7),
            b7: new Pawn_1.Pawn(Types_1.Colour[1], "b", 7),
            c7: new Pawn_1.Pawn(Types_1.Colour[1], "c", 7),
            d7: new Pawn_1.Pawn(Types_1.Colour[1], "d", 7),
            e7: new Pawn_1.Pawn(Types_1.Colour[1], "e", 7),
            f7: new Pawn_1.Pawn(Types_1.Colour[1], "f", 7),
            g7: new Pawn_1.Pawn(Types_1.Colour[1], "g", 7),
            Rb1: new Rook_1.Rook(Types_1.Colour[1], "a", 8),
            Nb1: new Knight_1.Knight(Types_1.Colour[1], "b", 8),
            Bb1: new Bishop_1.Bishop(Types_1.Colour[1], "c", 8),
            Qb: new Queen_1.Queen(Types_1.Colour[1], "d", 8),
            Kb: new King_1.King(Types_1.Colour[1], "e", 8),
            Bb2: new Bishop_1.Bishop(Types_1.Colour[1], "f", 8),
            Nb2: new Knight_1.Knight(Types_1.Colour[1], "g", 8),
            Rb2: new Rook_1.Rook(Types_1.Colour[1], "h", 8),
        };
        return pieces;
    }
}
exports.Game = Game;
