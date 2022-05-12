"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChessGame = void 0;
const Game_1 = require("./Game");
class ChessGame {
    static makeGame() {
        return new Game_1.Game();
    }
    static makeCustomGame(pieceArray) {
        return new Game_1.Game(pieceArray);
    }
}
exports.ChessGame = ChessGame;
