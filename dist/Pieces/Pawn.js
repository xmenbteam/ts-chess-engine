"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = void 0;
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class Pawn extends PiecesAndPosition_1.Piece {
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
        this.hasMoved = false;
    }
    setHasmoved() {
        this.hasMoved = true;
    }
    canMoveTo(newPosition) {
        const { file, rank } = newPosition.distanceFrom(this.position);
        if (!file && rank === 1)
            return true;
        if (!file && rank === 2 && !this.hasMoved)
            return true;
        return false;
    }
}
exports.Pawn = Pawn;
