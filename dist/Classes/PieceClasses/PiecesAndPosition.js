"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Piece = exports.Position = void 0;
const utils_1 = require("../../utils/utils");
class Position {
    constructor(file, rank) {
        this.file = file;
        this.rank = rank;
    }
    distanceFrom(otherPosition) {
        const { letterRef } = new utils_1.utils().getLetterRefs();
        const fileDiff = letterRef[this.file] - letterRef[otherPosition.file];
        const rankDiff = this.rank - otherPosition.rank;
        return { file: fileDiff, rank: rankDiff };
    }
    getPosition() {
        return { file: this.file, rank: this.rank };
    }
    setPosition(file, rank) {
        this.file = file;
        this.rank = rank;
    }
}
exports.Position = Position;
class Piece {
    constructor(pieceColour, file, rank) {
        this.position = new Position(file, rank);
        this.colour = pieceColour;
        this.captured = false;
        this.hasMoved = false;
        this.moveCount = 0;
        this.previousSquares = [`${file}${rank}`];
    }
    moveTo(file, rank) {
        this.position.setPosition(file, rank);
        this.incrementMoveCount();
        this.addPreviousSquare(file, rank);
    }
    getPreviousSquares() {
        return this.previousSquares;
    }
    addPreviousSquare(file, rank) {
        this.previousSquares.push(`${file}${rank}`);
    }
    setIsCaptured() {
        this.captured = !this.captured;
    }
    getIsCaptured() {
        return this.captured;
    }
    getColour() {
        return this.colour;
    }
    getHasMoved() {
        return this.hasMoved;
    }
    setHasMoved() {
        this.hasMoved = !this.hasMoved;
    }
    getMoveCount() {
        return this.moveCount;
    }
    incrementMoveCount() {
        this.moveCount++;
    }
}
exports.Piece = Piece;
