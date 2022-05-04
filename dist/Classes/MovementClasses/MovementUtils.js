"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovementUtils = void 0;
const utils_1 = require("../../utils/utils");
class MovementUtils {
    completeMove(pieceObj, piece, destiPos, move) {
        const flag = move[0];
        const { file: f, rank: r } = piece.position.position;
        const { file: newF, rank: newR } = destiPos.position;
        piece.position.position = { file: newF, rank: Number(newR) };
        const newKey = `${flag}${newF}${newR}`;
        pieceObj[newKey] = piece;
        delete pieceObj[`${flag}${f}${r}`];
        return piece.constructor.name;
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
