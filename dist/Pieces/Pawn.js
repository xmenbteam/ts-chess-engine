"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = void 0;
const CanMoveToSquare_1 = require("../utils/CanMoveToSquare");
const IsPieceInTheWay_1 = require("../utils/IsPieceInTheWay");
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class Pawn extends PiecesAndPosition_1.Piece {
    canMoveTo(newPosition, positions) {
        const distance = newPosition.distanceFrom(this.position);
        const props = [
            this.position.getPosition(),
            newPosition.getPosition(),
            positions,
        ];
        const canMove = new CanMoveToSquare_1.CanMoveToSquare(distance).pawn(this.getHasMoved());
        const isInWay = new IsPieceInTheWay_1.IsPieceInTheWay(...props).checkPawnMove();
        if (canMove && !isInWay)
            return true;
        return false;
    }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
    }
}
exports.Pawn = Pawn;
