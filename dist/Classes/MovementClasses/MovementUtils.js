"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovementUtils = void 0;
const utils_1 = require("../../utils/utils");
class MovementUtils {
    completeMove(pieceObj, f, r, piecesThatCanMove) {
        const piece = piecesThatCanMove[0];
        const flag = piece[0];
        if (!pieceObj[piece].getHasMoved())
            pieceObj[piece].setHasMoved();
        pieceObj[piece].position.setPosition(f, Number(r));
        pieceObj[`${flag}${f}${r}`] = pieceObj[piece];
        delete pieceObj[piece];
        return piece;
    }
    completeCastle(piece, colour, side, pieces) {
        const castleRefObj = new utils_1.utils().getCastleRef();
        const { newKingFile, rank, oldKingCoord, newRookFile, oldRookCoord } = castleRefObj;
        piece.setHasMoved();
        piece.position.setPosition(newKingFile[side], rank[colour]);
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
