"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.King = void 0;
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class King extends PiecesAndPosition_1.Piece {
    // private _hasMoved: boolean;
    // public get hasMoved(): boolean {
    //   return this._hasMoved;
    // }
    // public set hasMoved(hasMoved) {
    //   this._hasMoved = hasMoved;
    // }
    canMoveTo(newPosition) {
        const { rank, file } = newPosition.distanceFrom(this.position);
        if ((Math.abs(file) === 1 && Math.abs(rank) === 1) ||
            (Math.abs(file) === 1 && !Math.abs(rank)) ||
            (!Math.abs(file) && Math.abs(rank) === 1))
            return true;
        return false;
    }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
        // this._hasMoved = false;
    }
}
exports.King = King;
