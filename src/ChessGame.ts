import { Piece } from "./Classes/PieceClasses/PiecesAndPosition";
import { Game } from "./Game";
import { CustomPieceArray } from "./Types";

export class ChessGame {
  static makeGame(pieceArray?: CustomPieceArray) {
    return new Game(pieceArray);
  }

  static move(game: Game, move: string, colour: number) {
    return game.makeMove(move, colour);
  }
  static capture(game: Game, capturePiece: Piece, targetPiece: Piece) {
    return game.capturePiece(capturePiece, targetPiece);
  }
  static getCurrentTurn(game: Game) {
    return game.isWhiteMove;
  }
}
