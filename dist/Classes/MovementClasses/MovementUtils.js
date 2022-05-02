"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovementUtils = void 0;
const utils_1 = require("../../utils/utils");
class MovementUtils {
    completeMove(pieceObj, pieceThatCanMove, move) {
        const HasMovedPieces = new utils_1.utils().piecesThatNeedMoved();
        const pieceName = pieceThatCanMove.constructor.name;
        const piece = pieceObj[pieceStr];
        const flag = pieceStr[0];
        const { file: f, rank: r } = pieceThatCanMove.position.position;
        if (pieceName === "King" || pieceName === "Pawn" || pieceName === "Rook") {
            if (HasMovedPieces.includes(pieceName))
                piece.hasMoved = true;
        }
        pieceObj[pieceStr].position.position = { file: f, rank: Number(r) };
        pieceObj[`${flag}${f}${r}`] = pieceObj[pieceStr];
        delete pieceObj[pieceStr];
        return piece;
    }
    completeCastle(piece, colour, side, pieces) {
        const castleRefObj = new utils_1.utils().getCastleRef();
        const { newKingFile, rank, oldKingCoord, newRookFile, oldRookCoord } = castleRefObj;
        piece.hasMoved = true;
        piece.position.position = { file: newKingFile[side], rank: rank[colour] };
        if (piece.constructor.name === "King") {
            pieces[`K${newKingFile[side]}${rank[colour]}`] = piece;
            delete pieces[oldKingCoord[colour]];
        }
        if (piece.constructor.name === "Rook") {
            pieces[`R${newRookFile[side]}${rank[colour]}`] = piece;
            delete pieces[oldRookCoord[side][colour]];
        }
    }
}
exports.MovementUtils = MovementUtils;
