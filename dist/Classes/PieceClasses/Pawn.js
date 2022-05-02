"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = void 0;
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class Pawn extends PiecesAndPosition_1.Piece {
    // private _hasMoved: boolean;
    // private _moveCount: number;
    // public get hasMoved() {
    //   return this._hasMoved;
    // }
    // public set hasMoved(hasMoved: boolean) {
    //   this._hasMoved = hasMoved;
    // }
    // public get moveCount() {
    //   return this._moveCount;
    // }
    // public set moveCount(num: number) {
    //   this._moveCount += num;
    // }
    canMoveTo(newPosition) {
        const { file, rank } = newPosition.distanceFrom(this.position);
        if ((!file && Math.abs(rank) === 1) ||
            (!file && Math.abs(rank) === 2 && !this.hasMoved))
            return true;
        return false;
    }
    move() { }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
        // this._hasMoved = false;
        // this._moveCount = 0;
    }
}
exports.Pawn = Pawn;
