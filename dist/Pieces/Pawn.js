"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = void 0;
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class Pawn extends PiecesAndPosition_1.Piece {
    canMoveTo(newPosition, positions) {
        const { file: fileDist, rank: rankDist } = newPosition.distanceFrom(this.position);
        const { file: pieceFile, rank: pieceRank } = this.position.getPosition();
        const { file: newFile, rank: newRank } = newPosition.getPosition();
        const ignoreYourself = positions.filter((p) => p !== `${pieceFile}${pieceRank}`);
        const pieceInTheWay = ignoreYourself.includes(`${newFile}${newRank}`);
        const canMove = (!fileDist && Math.abs(rankDist) === 1) ||
            (!fileDist && Math.abs(rankDist) === 2 && !this.getHasMoved());
        if (canMove && !pieceInTheWay)
            return true;
        return false;
    }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
    }
}
exports.Pawn = Pawn;
