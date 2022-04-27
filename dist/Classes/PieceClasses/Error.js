"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class Error extends PiecesAndPosition_1.Piece {
    canMoveTo(newPosition, positions) {
        return false;
    }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
    }
}
exports.Error = Error;
