"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queen = void 0;
const PiecesAndPosition_1 = require("./PiecesAndPosition");
const movement_classes_1 = require("../utils/movement-classes");
class Queen extends PiecesAndPosition_1.Piece {
    canMoveTo(newPosition, positions) {
        const { file: fileDist, rank: rankDist } = newPosition.distanceFrom(this.position);
        const { file: pieceFile, rank: pieceRank } = this.position.getPosition();
        const { file: newFile, rank: newRank } = newPosition.getPosition();
        const canMove = !fileDist || !rankDist || Math.abs(fileDist) === Math.abs(rankDist);
        const props = [
            pieceFile,
            pieceRank,
            newFile,
            newRank,
            positions,
        ];
        const isInWay = new movement_classes_1.IsPieceInTheWay(...props).checkBoth();
        if (canMove && !isInWay)
            return true;
        return false;
    }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
    }
}
exports.Queen = Queen;
