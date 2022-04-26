"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.King = void 0;
const movement_classes_1 = require("../utils/movement-classes");
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class King extends PiecesAndPosition_1.Piece {
    canMoveTo(newPosition, positions) {
        const { file: fileDist, rank: rankDist } = newPosition.distanceFrom(this.position);
        const { file: pieceFile, rank: pieceRank } = this.position.getPosition();
        const { file: newFile, rank: newRank } = newPosition.getPosition();
        const canMove = (Math.abs(fileDist) === 1 && Math.abs(rankDist) === 1) ||
            (Math.abs(fileDist) === 1 && !Math.abs(rankDist)) ||
            (!Math.abs(fileDist) && Math.abs(rankDist) === 1);
        const props = [
            pieceFile,
            pieceRank,
            newFile,
            newRank,
            positions,
        ];
        const isInWay = new movement_classes_1.IsPieceInTheWay(...props).checkKingMove();
        if (canMove && !isInWay)
            return true;
        return false;
    }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
    }
}
exports.King = King;
