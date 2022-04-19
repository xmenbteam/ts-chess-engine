"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rook = void 0;
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class Rook extends PiecesAndPosition_1.Piece {
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
        this.hasMoved = false;
    }
    setHasMoved() {
        this.hasMoved = true;
    }
    getHasMoved() {
        return this.hasMoved;
    }
    canMoveTo(newPosition) {
        const { file, rank } = newPosition.distanceFrom(this.position);
        if (!file || !rank)
            return true;
        return false;
    }
}
exports.Rook = Rook;
