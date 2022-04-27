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
        const minFile = Math.min(utils_1.letterRef[file], utils_1.letterRef[newFile]);
        const maxFile = Math.max(utils_1.letterRef[file], utils_1.letterRef[newFile]);
        const minRank = Math.min(rank, newRank);
        const maxRank = Math.max(rank, newRank);
        for (let i = minRank; i <= maxRank; i++) {
            const square = `${file}${i}`;
            if (this.ignoreYourself.includes(square))
                this.isInWay = true;
        }
        for (let i = minFile; i <= maxFile; i++) {
            const square = `${utils_1.files[i]}${rank}`;
            if (this.ignoreYourself.includes(square))
                this.isInWay = true;
        }
        return this.isInWay;
    }
    checkDiagonal() {
        const { file, rank } = this.piecePos;
        const { file: newFile, rank: newRank } = this.newPos;
        this.pieceCoords = `${file}${rank}`;
        this.ignoreYourself = this.positions.filter((p) => p !== this.pieceCoords);
        let direction = "";
        const directionRef = {
            NE: newRank > rank && utils_1.letterRef[newFile] > utils_1.letterRef[file],
            SE: newRank < rank && utils_1.letterRef[newFile] > utils_1.letterRef[file],
            NW: newRank > rank && utils_1.letterRef[newFile] < utils_1.letterRef[file],
            SW: newRank < rank && utils_1.letterRef[newFile] < utils_1.letterRef[file],
        };
        for (const [dir, cond] of Object.entries(directionRef)) {
            if (cond)
                direction = dir;
        }
        if (direction === "SE") {
            for (let i = utils_1.letterRef[file], j = rank; i <= utils_1.letterRef[newFile] && j > 0; i++, j--) {
                const square = `${utils_1.files[i]}${j}`;
                if (this.ignoreYourself.includes(square))
                    this.isInWay = true;
            }
        }
        if (direction === "NE") {
            for (let i = utils_1.letterRef[file], j = rank; i <= utils_1.letterRef[newFile] && j <= 8; i++, j++) {
                const square = `${utils_1.files[i]}${j}`;
                if (this.ignoreYourself.includes(square))
                    this.isInWay = true;
            }
        }
        if (direction === "SW") {
            for (let i = utils_1.letterRef[file], j = rank; i >= utils_1.letterRef[newFile] && j > 0; i--, j--) {
                const square = `${utils_1.files[i]}${j}`;
                if (this.ignoreYourself.includes(square))
                    this.isInWay = true;
            }
        }
        if (direction === "NW") {
            for (let i = utils_1.letterRef[file], j = rank; i >= utils_1.letterRef[newFile] && j <= 8; i--, j++) {
                const square = `${utils_1.files[i]}${j}`;
                if (this.ignoreYourself.includes(square))
                    this.isInWay = true;
            }
        }
        return this.isInWay;
    }
    checkBoth() {
        const { file, rank } = this.piecePos;
        const { file: newFile, rank: newRank } = this.newPos;
        if (file === newFile || rank === newRank)
            this.checkRankAndFile();
        else
            this.checkDiagonal();
        return this.isInWay;
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
