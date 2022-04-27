"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPieceInTheWay = void 0;
const utils_1 = require("../../utils/utils");
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
        const { letterRef, files } = new utils_1.utils().getLetterRefs();
        const { file, rank } = this.piecePos;
        const { file: newFile, rank: newRank } = this.newPos;
        this.pieceCoords = `${file}${rank}`;
        this.ignoreYourself = this.positions.filter((p) => p !== this.pieceCoords);
        const minFile = Math.min(letterRef[file], letterRef[newFile]);
        const maxFile = Math.max(letterRef[file], letterRef[newFile]);
        const minRank = Math.min(rank, newRank);
        const maxRank = Math.max(rank, newRank);
        for (let i = minRank; i <= maxRank; i++) {
            const square = `${file}${i}`;
            if (this.ignoreYourself.includes(square))
                this.isInWay = true;
        }
        for (let i = minFile; i <= maxFile; i++) {
            const square = `${files[i]}${rank}`;
            if (this.ignoreYourself.includes(square))
                this.isInWay = true;
        }
        return this.isInWay;
    }
    checkDiagonal() {
        const { file, rank } = this.piecePos;
        const { file: newFile, rank: newRank } = this.newPos;
        const { letterRef, files } = new utils_1.utils().getLetterRefs();
        this.pieceCoords = `${file}${rank}`;
        this.ignoreYourself = this.positions.filter((p) => p !== this.pieceCoords);
        let direction = "";
        const directionRef = {
            NE: newRank > rank && letterRef[newFile] > letterRef[file],
            SE: newRank < rank && letterRef[newFile] > letterRef[file],
            NW: newRank > rank && letterRef[newFile] < letterRef[file],
            SW: newRank < rank && letterRef[newFile] < letterRef[file],
        };
        for (const [dir, cond] of Object.entries(directionRef)) {
            if (cond)
                direction = dir;
        }
        if (direction === "SE") {
            for (let i = letterRef[file], j = rank; i <= letterRef[newFile] && j > 0; i++, j--) {
                const square = `${files[i]}${j}`;
                if (this.ignoreYourself.includes(square))
                    this.isInWay = true;
            }
        }
        if (direction === "NE") {
            for (let i = letterRef[file], j = rank; i <= letterRef[newFile] && j <= 8; i++, j++) {
                const square = `${files[i]}${j}`;
                if (this.ignoreYourself.includes(square))
                    this.isInWay = true;
            }
        }
        if (direction === "SW") {
            for (let i = letterRef[file], j = rank; i >= letterRef[newFile] && j > 0; i--, j--) {
                const square = `${files[i]}${j}`;
                if (this.ignoreYourself.includes(square))
                    this.isInWay = true;
            }
        }
        if (direction === "NW") {
            for (let i = letterRef[file], j = rank; i >= letterRef[newFile] && j <= 8; i--, j++) {
                const square = `${files[i]}${j}`;
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
        const { letterRef, files } = new utils_1.utils().getLetterRefs();
        this.wrongSquares = [
            `${files[letterRef[file] - 1]}${rank}`,
            `${files[letterRef[file] - 1]}${rank + 1}`,
            `${files[letterRef[file]]}${rank + 1}`,
            `${files[letterRef[file] + 1]}${rank + 1}`,
            `${files[letterRef[file] + 1]}${rank}`,
            `${files[letterRef[file] + 1]}${rank - 1}`,
            `${files[letterRef[file]]}${rank - 1}`,
            `${files[letterRef[file] - 1]}${rank - 1}`,
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
