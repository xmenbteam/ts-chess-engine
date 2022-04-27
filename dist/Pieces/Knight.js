"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Knight = void 0;
const CanMoveToSquare_1 = require("../utils/CanMoveToSquare");
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class Knight extends PiecesAndPosition_1.Piece {
    canMoveTo(newPosition, positions) {
        const distance = newPosition.distanceFrom(this.position);
        const canMove = new CanMoveToSquare_1.CanMoveToSquare(distance).knight();
        return canMove;
    }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
    }
}
exports.Knight = Knight;
