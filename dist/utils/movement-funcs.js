"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagonalInTheWay = exports.RankAndFileInTheWay = void 0;
const utils_1 = require("./utils");
class RankAndFileInTheWay {
    constructor(pieceFile, pieceRank, newFile, newRank, positions) {
        this.isInWay = false;
        this.pieceFile = pieceFile;
        this.pieceRank = pieceRank;
        this.newFile = newFile;
        this.newRank = newRank;
        this.positions = positions;
    }
    checkRankAndFile() {
        const pieceCoords = `${this.pieceFile}${this.pieceRank}`;
        const ignoreYourself = this.positions.filter((p) => p !== pieceCoords);
        for (let i = this.pieceRank; i <= this.newRank; i++) {
            if (ignoreYourself.includes(`${this.pieceFile}${i}`))
                this.isInWay = true;
        }
        for (let i = utils_1.letterRef[this.pieceFile]; i <= utils_1.letterRef[this.newFile]; i++) {
            if (ignoreYourself.includes(`${utils_1.files[i]}${this.pieceRank}`))
                this.isInWay = true;
        }
        return this.isInWay;
    }
}
exports.RankAndFileInTheWay = RankAndFileInTheWay;
const diagonalInTheWay = (pieceFile, pieceRank, newFile, newRank, positions) => {
    const pieceCoords = `${pieceFile}${pieceRank}`;
    const ignoreYourself = positions.filter((p) => p !== pieceCoords);
    let isInWay = false;
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
    return isInWay;
};
exports.diagonalInTheWay = diagonalInTheWay;
