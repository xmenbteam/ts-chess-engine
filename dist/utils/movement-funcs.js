"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagonalInTheWay = exports.rankAndFileInTheWay = void 0;
const utils_1 = require("./utils");
const rankAndFileInTheWay = (pieceFile, pieceRank, newFile, newRank, positions) => {
    let isInWay = false;
    const pieceCoords = `${pieceFile}${pieceRank}`;
    const ignoreYourself = positions.filter((p) => p !== pieceCoords);
    for (let i = pieceRank; i <= newRank; i++) {
        if (ignoreYourself.includes(`${pieceFile}${i}`))
            isInWay = true;
    }
    for (let i = utils_1.letterRef[pieceFile]; i <= utils_1.letterRef[newFile]; i++) {
        if (ignoreYourself.includes(`${utils_1.files[i]}${pieceRank}`))
            isInWay = true;
    }
    return isInWay;
};
exports.rankAndFileInTheWay = rankAndFileInTheWay;
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
