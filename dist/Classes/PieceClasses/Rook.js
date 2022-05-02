"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rook = void 0;
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class Rook extends PiecesAndPosition_1.Piece {
    // private _hasMoved: boolean;
    // public get hasMoved(): boolean {
    //   return this._hasMoved;
    // }
    // public set hasMoved(hasMoved) {
    //   this._hasMoved = hasMoved;
    // }
    canMoveTo(newPosition) {
        const { file, rank } = newPosition.distanceFrom(this.position);
        if (!file || !rank)
            return true;
        return false;
    }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
        // this._hasMoved = false;
    }
}
exports.Rook = Rook;
