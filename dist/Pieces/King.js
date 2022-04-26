"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.King = void 0;
const utils_1 = require("../utils/utils");
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class King extends PiecesAndPosition_1.Piece {
    canMoveTo(newPosition, positions) {
        const { file: fileDist, rank: rankDist } = newPosition.distanceFrom(this.position);
        const { file: pieceFile, rank: pieceRank } = this.position.getPosition();
        const { file: newFile, rank: newRank } = newPosition.getPosition();
        const canMove = (Math.abs(fileDist) === 1 && Math.abs(rankDist) === 1) ||
            (Math.abs(fileDist) === 1 && !Math.abs(rankDist)) ||
            (!Math.abs(fileDist) && Math.abs(rankDist) === 1);
        const pieceCoords = `${pieceFile}${pieceRank}`;
        const ignoreYourself = positions.filter((p) => p !== pieceCoords);
        let isInWay = false;
        const wrongSquares = [
            `${utils_1.files[utils_1.letterRef[pieceFile] - 1]}${pieceRank}`,
            `${utils_1.files[utils_1.letterRef[pieceFile] - 1]}${pieceRank + 1}`,
            `${utils_1.files[utils_1.letterRef[pieceFile]]}${pieceRank + 1}`,
            `${utils_1.files[utils_1.letterRef[pieceFile] + 1]}${pieceRank + 1}`,
            `${utils_1.files[utils_1.letterRef[pieceFile] + 1]}${pieceRank}`,
            `${utils_1.files[utils_1.letterRef[pieceFile] + 1]}${pieceRank - 1}`,
            `${utils_1.files[utils_1.letterRef[pieceFile]]}${pieceRank - 1}`,
            `${utils_1.files[utils_1.letterRef[pieceFile] - 1]}${pieceRank - 1}`,
        ];
        wrongSquares.forEach((squ) => {
            if (ignoreYourself.includes(squ))
                isInWay = true;
        });
        if (canMove && !isInWay)
            return true;
        return false;
    }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
    }
}
exports.King = King;
