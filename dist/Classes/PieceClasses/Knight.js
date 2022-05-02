"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Knight = void 0;
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class Knight extends PiecesAndPosition_1.Piece {
    canMoveTo(newPosition) {
        const { file, rank } = newPosition.distanceFrom(this.position);
        if ((Math.abs(file) === 2 && Math.abs(rank) === 1) ||
            (Math.abs(file) === 1 && Math.abs(rank) === 2))
            return true;
        return false;
    }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
    }
}
exports.Knight = Knight;
