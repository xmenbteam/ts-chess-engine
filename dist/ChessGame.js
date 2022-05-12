"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChessGame = void 0;
const Game_1 = require("./Game");
class ChessGame {
    static makeGame(pieceArray) {
        return new Game_1.Game(pieceArray);
    }
    static move(game, move, colour) {
        return game.makeMove(move, colour);
    }
    static capture(game, capturePiece, targetPiece) {
        return game.capturePiece(capturePiece, targetPiece);
    }
    static getCurrentTurn(game) {
        return game.isWhiteMove;
    }
}
exports.ChessGame = ChessGame;
