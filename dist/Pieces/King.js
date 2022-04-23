"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.King = void 0;
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class King extends PiecesAndPosition_1.Piece {
    canMoveTo(newPosition) {
        const { file, rank } = newPosition.distanceFrom(this.position);
        if (Math.abs(file) === 1 && Math.abs(rank) === 1)
            return true;
        if (Math.abs(file) === 1 && !Math.abs(rank))
            return true;
        if (!Math.abs(file) && Math.abs(rank) === 1)
            return true;
        return false;
    }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
    }
}
exports.King = King;
