"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.King = void 0;
const movementClasses_1 = require("../utils/movementClasses");
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class King extends PiecesAndPosition_1.Piece {
    canMoveTo(newPosition, positions) {
        const distance = newPosition.distanceFrom(this.position);
        const props = [
            this.position.getPosition(),
            newPosition.getPosition(),
            positions,
        ];
        const canMove = new movementClasses_1.CanMoveToSquare(distance).king();
        const isInWay = new movementClasses_1.IsPieceInTheWay(...props).checkKingMove();
        if (canMove && !isInWay)
            return true;
        return false;
    }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
    }
}
exports.King = King;
