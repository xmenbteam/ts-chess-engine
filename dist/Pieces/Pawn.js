"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = void 0;
const movement_classes_1 = require("../utils/movement-classes");
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class Pawn extends PiecesAndPosition_1.Piece {
    canMoveTo(newPosition, positions) {
        const { file: fileDist, rank: rankDist } = newPosition.distanceFrom(this.position);
        const canMove = (!fileDist && Math.abs(rankDist) === 1) ||
            (!fileDist && Math.abs(rankDist) === 2 && !this.getHasMoved());
        const props = [
            this.position.getPosition(),
            newPosition.getPosition(),
            positions,
        ];
        const isInWay = new movement_classes_1.IsPieceInTheWay(...props).checkPawnMove();
        if (canMove && !isInWay)
            return true;
        return false;
    }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
    }
}
exports.Pawn = Pawn;
