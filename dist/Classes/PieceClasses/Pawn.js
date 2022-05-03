"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = void 0;
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class Pawn extends PiecesAndPosition_1.Piece {
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
        this._hasMoved = false;
        this._moveCount = 0;
    }
    get hasMoved() {
        return this._hasMoved;
    }
    set hasMoved(hasMoved) {
        if (!this.hasMoved)
            this._hasMoved = hasMoved;
    }
    get moveCount() {
        return this._moveCount;
    }
    set moveCount(num) {
        this._moveCount += num;
    }
    canMoveTo(newPosition) {
        const { file, rank } = newPosition.distanceFrom(this.position);
        if ((!file && Math.abs(rank) === 1) ||
            (!file && Math.abs(rank) === 2 && !this.hasMoved))
            return true;
        return false;
    }
    moveTo(file, rank) {
        this.hasMoved = true;
        if (this.position.position.rank !== rank)
            this.moveCount = 1;
        this.position.position = { file, rank };
        return { hasMoved: this.hasMoved, moveCount: this.moveCount };
    }
}
exports.Pawn = Pawn;
