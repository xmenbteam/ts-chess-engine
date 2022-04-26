"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPieceInTheWay = void 0;
const utils_1 = require("./utils");
class IsPieceInTheWay {
    constructor(piecePos, newPos, positions) {
        this.isInWay = false;
        this.piecePos = piecePos;
        this.newPos = newPos;
        this.positions = positions;
        this.pieceCoords = "";
        this.ignoreYourself = [];
        this.wrongSquares = [];
    }
    checkRankAndFile() {
        const { file, rank } = this.piecePos;
        const { file: newFile, rank: newRank } = this.newPos;
        this.pieceCoords = `${file}${rank}`;
        this.ignoreYourself = this.positions.filter((p) => p !== this.pieceCoords);
        for (let i = rank; i <= newRank; i++) {
            if (this.ignoreYourself.includes(`${file}${i}`))
                this.isInWay = true;
        }
        for (let i = utils_1.letterRef[file]; i <= utils_1.letterRef[newFile]; i++) {
            if (this.ignoreYourself.includes(`${utils_1.files[i]}${rank}`))
                this.isInWay = true;
        }
        return this.isInWay;
    }
    checkDiagonal() {
        const { file, rank } = this.piecePos;
        const { file: newFile, rank: newRank } = this.newPos;
        this.pieceCoords = `${file}${rank}`;
        this.ignoreYourself = this.positions.filter((p) => p !== this.pieceCoords);
        // Checks if piece is moving SOUTHEAST
        for (let i = newRank; i < rank; i++) {
            const square = `${utils_1.files[rank + i - 1]}${rank - i}`;
            if (this.ignoreYourself.includes(square))
                this.isInWay = true;
        }
        // Checks if piece is moving NORTHEAST
        for (let i = utils_1.letterRef[file], j = rank; i < utils_1.letterRef[newFile]; i++, j++) {
            const square = `${utils_1.files[i]}${j}`;
            if (this.ignoreYourself.includes(square))
                this.isInWay = true;
        }
        // Checks if piece is moving SOUTHWEST
        for (let i = rank; i >= newRank; i--) {
            const square = `${utils_1.files[rank - i]}${rank - i + 1}`;
            if (this.ignoreYourself.includes(square))
                this.isInWay = true;
        }
        // Checks if piece is moving NORTHWEST
        for (let i = rank; i < newRank; i++) {
            const square = `${utils_1.files[i - rank]}${newRank - i + rank}`;
            if (this.ignoreYourself.includes(square))
                this.isInWay = true;
        }
        return this.isInWay;
    }
    checkBoth() {
        return this.checkDiagonal() && this.checkRankAndFile();
    }
    checkKingMove() {
        const { file, rank } = this.piecePos;
        this.ignoreYourself = this.positions.filter((p) => p !== this.pieceCoords);
        this.wrongSquares = [
            `${utils_1.files[utils_1.letterRef[file] - 1]}${rank}`,
            `${utils_1.files[utils_1.letterRef[file] - 1]}${rank + 1}`,
            `${utils_1.files[utils_1.letterRef[file]]}${rank + 1}`,
            `${utils_1.files[utils_1.letterRef[file] + 1]}${rank + 1}`,
            `${utils_1.files[utils_1.letterRef[file] + 1]}${rank}`,
            `${utils_1.files[utils_1.letterRef[file] + 1]}${rank - 1}`,
            `${utils_1.files[utils_1.letterRef[file]]}${rank - 1}`,
            `${utils_1.files[utils_1.letterRef[file] - 1]}${rank - 1}`,
        ];
        this.wrongSquares.forEach((squ) => {
            if (this.ignoreYourself.includes(squ))
                this.isInWay = true;
        });
        return this.isInWay;
    }
    checkPawnMove() {
        const { file: newFile, rank: newRank } = this.newPos;
        this.ignoreYourself = this.positions.filter((p) => p !== this.pieceCoords);
        this.isInWay = this.ignoreYourself.includes(`${newFile}${newRank}`);
        return this.isInWay;
    }
}
exports.IsPieceInTheWay = IsPieceInTheWay;
