"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPieceInTheWay = void 0;
const utils_1 = require("./utils");
class IsPieceInTheWay {
    constructor(pieceFile, pieceRank, newFile, newRank, positions) {
        this.isInWay = false;
        this.pieceFile = pieceFile;
        this.pieceRank = pieceRank;
        this.newFile = newFile;
        this.newRank = newRank;
        this.positions = positions;
        this.pieceCoords = "";
        this.ignoreYourself = [];
        this.wrongSquares = [];
    }
    checkRankAndFile() {
        this.pieceCoords = `${this.pieceFile}${this.pieceRank}`;
        this.ignoreYourself = this.positions.filter((p) => p !== this.pieceCoords);
        for (let i = this.pieceRank; i <= this.newRank; i++) {
            if (this.ignoreYourself.includes(`${this.pieceFile}${i}`))
                this.isInWay = true;
        }
        for (let i = utils_1.letterRef[this.pieceFile]; i <= utils_1.letterRef[this.newFile]; i++) {
            if (this.ignoreYourself.includes(`${utils_1.files[i]}${this.pieceRank}`))
                this.isInWay = true;
        }
        return this.isInWay;
    }
    checkDiagonal() {
        this.pieceCoords = `${this.pieceFile}${this.pieceRank}`;
        this.ignoreYourself = this.positions.filter((p) => p !== this.pieceCoords);
        // Checks if piece is moving SOUTHEAST
        for (let i = this.newRank; i < this.pieceRank; i++) {
            const square = `${utils_1.files[this.pieceRank + i - 1]}${this.pieceRank - i}`;
            if (this.ignoreYourself.includes(square))
                this.isInWay = true;
        }
        // Checks if piece is moving NORTHEAST
        for (let i = utils_1.letterRef[this.pieceFile], j = this.pieceRank; i < utils_1.letterRef[this.newFile]; i++, j++) {
            const square = `${utils_1.files[i]}${j}`;
            if (this.ignoreYourself.includes(square))
                this.isInWay = true;
        }
        // Checks if piece is moving SOUTHWEST
        for (let i = this.pieceRank; i >= this.newRank; i--) {
            const square = `${utils_1.files[this.pieceRank - i]}${this.pieceRank - i + 1}`;
            if (this.ignoreYourself.includes(square))
                this.isInWay = true;
        }
        // Checks if piece is moving NORTHWEST
        for (let i = this.pieceRank; i < this.newRank; i++) {
            const square = `${utils_1.files[i - this.pieceRank]}${this.newRank - i + this.pieceRank}`;
            if (this.ignoreYourself.includes(square))
                this.isInWay = true;
        }
        return this.isInWay;
    }
    checkBoth() {
        return this.checkDiagonal() && this.checkRankAndFile();
    }
    checkKingMove() {
        this.wrongSquares = [
            `${utils_1.files[utils_1.letterRef[this.pieceFile] - 1]}${this.pieceRank}`,
            `${utils_1.files[utils_1.letterRef[this.pieceFile] - 1]}${this.pieceRank + 1}`,
            `${utils_1.files[utils_1.letterRef[this.pieceFile]]}${this.pieceRank + 1}`,
            `${utils_1.files[utils_1.letterRef[this.pieceFile] + 1]}${this.pieceRank + 1}`,
            `${utils_1.files[utils_1.letterRef[this.pieceFile] + 1]}${this.pieceRank}`,
            `${utils_1.files[utils_1.letterRef[this.pieceFile] + 1]}${this.pieceRank - 1}`,
            `${utils_1.files[utils_1.letterRef[this.pieceFile]]}${this.pieceRank - 1}`,
            `${utils_1.files[utils_1.letterRef[this.pieceFile] - 1]}${this.pieceRank - 1}`,
        ];
        this.wrongSquares.forEach((squ) => {
            if (this.ignoreYourself.includes(squ))
                this.isInWay = true;
        });
        return this.isInWay;
    }
}
exports.IsPieceInTheWay = IsPieceInTheWay;
