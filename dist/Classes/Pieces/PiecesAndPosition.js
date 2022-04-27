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
        const fileDiff = utils_1.letterRef[this.file] - utils_1.letterRef[otherPosition.file];
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
        this.hasMoved = false;
        this.position = new Position(file, rank);
        this.colour = pieceColour;
        this.captured = false;
    }
    moveTo(file, rank) {
        this.position.setPosition(file, rank);
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
}
exports.Piece = Piece;
