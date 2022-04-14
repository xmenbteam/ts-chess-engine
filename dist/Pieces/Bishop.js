"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bishop = void 0;
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class Bishop extends PiecesAndPosition_1.Piece {
    canMoveTo(newPosition) {
        const { file, rank } = newPosition.distanceFrom(this.position);
        if (Math.abs(file) === Math.abs(rank))
            return true;
        return false;
    }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
    }
}
exports.Bishop = Bishop;
