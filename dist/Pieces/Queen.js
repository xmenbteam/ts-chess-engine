"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queen = void 0;
const PiecesAndPosition_1 = require("./PiecesAndPosition");
const MovClasses_1 = require("../utils/MovClasses");
class Queen extends PiecesAndPosition_1.Piece {
    canMoveTo(newPosition, positions) {
        const distance = newPosition.distanceFrom(this.position);
        const props = [
            this.position.getPosition(),
            newPosition.getPosition(),
            positions,
        ];
        const canMove = new MovClasses_1.CanMoveToSquare(distance).queen();
        const isInWay = new MovClasses_1.IsPieceInTheWay(...props).checkBoth();
        if (canMove && !isInWay)
            return true;
        return false;
    }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
    }
}
exports.Queen = Queen;
