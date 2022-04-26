"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Knight = void 0;
const MovClasses_1 = require("../utils/MovClasses");
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class Knight extends PiecesAndPosition_1.Piece {
    canMoveTo(newPosition, positions) {
        const distance = newPosition.distanceFrom(this.position);
        const canMove = new MovClasses_1.CanMoveToSquare(distance).knight();
        return canMove;
    }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
    }
}
exports.Knight = Knight;
