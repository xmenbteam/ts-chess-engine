"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rook = void 0;
const utils_1 = require("../utils/utils");
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class Rook extends PiecesAndPosition_1.Piece {
    canMoveTo(newPosition, positions) {
        const { file: fileDist, rank: rankDist } = newPosition.distanceFrom(this.position);
        const { file: pieceFile, rank: pieceRank } = this.position.getPosition();
        const { file: newFile, rank: newRank } = newPosition.getPosition();
        const canMove = !fileDist || !rankDist;
        const ignoreYourself = positions.filter((p) => p !== `${pieceFile}${pieceRank}`);
        let isInWay = false;
        for (let i = pieceRank; i <= newRank; i++) {
            if (ignoreYourself.includes(`${pieceFile}${i}`))
                isInWay = true;
        }
        for (let i = utils_1.letterRef[pieceFile]; i <= utils_1.letterRef[newFile]; i++) {
            if (ignoreYourself.includes(`${utils_1.files[i]}${pieceRank}`))
                isInWay = true;
        }
        if (canMove && !isInWay)
            return true;
        return false;
    }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
    }
}
exports.Rook = Rook;
