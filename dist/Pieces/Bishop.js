"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bishop = void 0;
const MovClasses_1 = require("../utils/MovClasses");
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class Bishop extends PiecesAndPosition_1.Piece {
    canMoveTo(newPosition, positions) {
        const distance = newPosition.distanceFrom(this.position);
        // console.log({ distance, newPosition }, "this.position", this.position);
        const props = [
            this.position.getPosition(),
            newPosition.getPosition(),
            positions,
        ];
        const canMove = new MovClasses_1.CanMoveToSquare(distance).bishop();
        const isInWay = new MovClasses_1.IsPieceInTheWay(...props).checkDiagonal();
        // console.log({ canMove, isInWay });
        if (canMove && !isInWay)
            return true;
        return false;
    }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
    }
}
exports.Bishop = Bishop;
