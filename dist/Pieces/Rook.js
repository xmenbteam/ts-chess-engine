"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rook = void 0;
const utils_1 = require("../utils/utils");
const Pieces_1 = require("./Pieces");
class Rook extends Pieces_1.Piece {
    canMoveTo() {
        const currentPosition = this.position.getPosition();
        const possibleMoves = [];
        // create array with every file/same rank
        for (let i = 0; i < utils_1.files.length; i++) {
            if (utils_1.files[i] !== currentPosition.file) {
                possibleMoves.push({ file: utils_1.files[i], rank: currentPosition.rank });
            }
        }
        // also every rank/same file
        for (let i = 0; i < utils_1.ranks.length; i++) {
            if (utils_1.ranks[i] !== currentPosition.rank) {
                possibleMoves.push({ file: currentPosition.file, rank: utils_1.ranks[i] });
            }
        }
        return possibleMoves;
    }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
    }
}
exports.Rook = Rook;
