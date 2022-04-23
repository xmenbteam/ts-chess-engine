"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = void 0;
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class Pawn extends PiecesAndPosition_1.Piece {
    canMoveTo(newPosition) {
        const { file, rank } = newPosition.distanceFrom(this.position);
        if (!file && Math.abs(rank) === 1)
            return true;
        if (!file && Math.abs(rank) === 2 && !this.getHasMoved())
            return true;
        if (Math.abs(file) === 1 && rank === 1)
            return true;
        return false;
    }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
    }
}
exports.Pawn = Pawn;
