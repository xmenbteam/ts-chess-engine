"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rook = void 0;
const movement_funcs_1 = require("../utils/movement-funcs");
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class Rook extends PiecesAndPosition_1.Piece {
    canMoveTo(newPosition, positions) {
        const { file: fileDist, rank: rankDist } = newPosition.distanceFrom(this.position);
        const { file: pieceFile, rank: pieceRank } = this.position.getPosition();
        const { file: newFile, rank: newRank } = newPosition.getPosition();
        const canMove = !fileDist || !rankDist;
        const props = [
            pieceFile,
            pieceRank,
            newFile,
            newRank,
            positions,
        ];
        const isInWay = (0, movement_funcs_1.rankAndFileInTheWay)(...props);
        if (canMove && !isInWay)
            return true;
        return false;
    }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
    }
}
exports.Rook = Rook;
