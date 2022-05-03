"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorPiece = void 0;
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class ErrorPiece extends PiecesAndPosition_1.Piece {
    canMoveTo(newPosition) {
        return false;
    }
    moveTo(file, rank) {
        this.position.position = { file, rank };
    }
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
    }
}
exports.ErrorPiece = ErrorPiece;
