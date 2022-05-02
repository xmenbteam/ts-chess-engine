"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Piece = exports.Position = void 0;
const utils_1 = require("../../utils/utils");
class Position {
    constructor(file, rank) {
        this._position = { file, rank };
    }
    distanceFrom(otherPosition) {
        const { letterRef } = new utils_1.utils().getLetterRefs();
        const fileDiff = letterRef[this._position.file] - letterRef[otherPosition._position.file];
        const rankDiff = this._position.rank - otherPosition._position.rank;
        return { file: fileDiff, rank: rankDiff };
    }
    get position() {
        return { file: this._position.file, rank: this._position.rank };
    }
    set position({ file, rank }) {
        this._position = { file, rank };
    }
}
exports.Position = Position;
class Piece {
    constructor(pieceColour, file, rank) {
        this.position = new Position(file, rank);
        this._colour = pieceColour;
        this._isCaptured = false;
        this._hasMoved = false;
        this._moveCount = 0;
    }
    moveTo(file, rank) {
        this.position.position = { file, rank };
    }
    set isCaptured(isCaptured) {
        this._isCaptured = isCaptured;
    }
    get isCaptured() {
        return this._isCaptured;
    }
    get colour() {
        return this._colour;
    }
    get hasMoved() {
        return this._hasMoved;
    }
    set hasMoved(hasMoved) {
        this._hasMoved = hasMoved;
    }
    get moveCount() {
        return this._moveCount;
    }
    set moveCount(num) {
        this._moveCount += num;
    }
}
exports.Piece = Piece;
