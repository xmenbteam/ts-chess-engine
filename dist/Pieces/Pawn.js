"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = void 0;
const Pieces_1 = require("./Pieces");
class Pawn extends Pieces_1.Piece {
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
        this.hasMoved = false;
    }
    setHasmoved() {
        this.hasMoved = true;
    }
    canMoveTo() {
        const currentPosition = this.position.getPosition();
        if (this.hasMoved)
            return [{ file: currentPosition.file, rank: currentPosition.rank + 1 }];
        else
            return [
                { file: currentPosition.file, rank: currentPosition.rank + 1 },
                { file: currentPosition.file, rank: currentPosition.rank + 2 },
            ];
    }
}
exports.Pawn = Pawn;
