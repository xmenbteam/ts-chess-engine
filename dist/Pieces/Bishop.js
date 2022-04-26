"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bishop = void 0;
const utils_1 = require("../utils/utils");
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class Bishop extends PiecesAndPosition_1.Piece {
    canMoveTo(newPosition, positions) {
        const { file: fileDist, rank: rankDist } = newPosition.distanceFrom(this.position);
        const { file: pieceFile, rank: pieceRank } = this.position.getPosition();
        const { file: newFile, rank: newRank } = newPosition.getPosition();
        const canMove = Math.abs(fileDist) === Math.abs(rankDist);
        const pieceCoords = `${pieceFile}${pieceRank}`;
        const ignoreYourself = positions.filter((p) => p !== pieceCoords);
        let isInWay = false;
        // console.log({ ignoreYourself });
        // Checks if piece is moving SOUTHEAST
        for (let i = newRank; i < pieceRank; i++) {
            const square = `${utils_1.files[pieceRank + i - 1]}${pieceRank - i}`;
            if (ignoreYourself.includes(square))
                isInWay = true;
        }
        // Checks if piece is moving NORTHEAST
        for (let i = utils_1.letterRef[pieceFile], j = pieceRank; i < utils_1.letterRef[newFile]; i++, j++) {
            const square = `${utils_1.files[i]}${j}`;
            console.log({ square, pieceCoords });
            if (ignoreYourself.includes(square))
                isInWay = true;
        }
        // Checks if piece is moving SOUTHWEST
        for (let i = pieceRank; i >= newRank; i--) {
            const square = `${utils_1.files[pieceRank - i]}${pieceRank - i + 1}`;
            if (ignoreYourself.includes(square))
                isInWay = true;
        }
        // Checks if piece is moving NORTHWEST
        for (let i = pieceRank; i < newRank; i++) {
            const square = `${utils_1.files[i - pieceRank]}${newRank - i + pieceRank}`;
            if (ignoreYourself.includes(square))
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
exports.Bishop = Bishop;
