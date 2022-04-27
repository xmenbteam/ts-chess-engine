"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialMoves = void 0;
const PiecesAndPosition_1 = require("../PieceClasses/PiecesAndPosition");
const Types_1 = require("../../Types");
const IsPieceInTheWay_1 = require("./IsPieceInTheWay");
const utils_1 = require("../../utils/utils");
class SpecialMoves {
    constructor(pieces) {
        this.pieces = pieces;
    }
    castle(side, colour, positions) {
        const castleRefObj = new utils_1.utils().getCastleRef();
        const { oldKingCoord, oldRookCoord, newKingFile, newRookFile, rank } = castleRefObj;
        const newKingPos = new PiecesAndPosition_1.Position(newKingFile[side], rank[colour]).getPosition();
        const newRookPos = new PiecesAndPosition_1.Position(newRookFile[side], rank[colour]).getPosition();
        const oldKingPos = this.pieces[oldKingCoord[colour]].position.getPosition();
        const oldRookPos = this.pieces[oldRookCoord[colour][side]].position.getPosition();
        const isPieceInWayKing = new IsPieceInTheWay_1.IsPieceInTheWay(oldKingPos, newKingPos, positions).checkRankAndFile();
        const isPieceInWayRook = new IsPieceInTheWay_1.IsPieceInTheWay(oldRookPos, newRookPos, positions).checkRankAndFile();
        const hasNotMoved = !this.pieces[oldKingCoord[colour]].getHasMoved() &&
            !this.pieces[oldRookCoord[colour][side]].getHasMoved();
        const king = this.pieces[oldKingCoord[colour]];
        const rook = this.pieces[oldRookCoord[colour][side]];
        try {
            if (hasNotMoved && !isPieceInWayKing && !isPieceInWayRook) {
                king.setHasMoved();
                king.position.setPosition(newKingFile[side], rank[colour]);
                this.pieces[`K${newKingFile[side]}${rank[colour]}`] = king;
                delete this.pieces[oldKingCoord[colour]];
                rook.setHasMoved();
                rook.position.setPosition(newRookFile[side], rank[colour]);
                this.pieces[`R${newRookFile[side]}${rank[colour]}`] = rook;
                delete this.pieces[oldRookCoord[colour][side]];
                return {
                    msg: `${Types_1.Colour[colour]} castled ${side ? "Queen" : "King"}side!`,
                };
            }
            else
                return {
                    msg: `${Types_1.Colour[colour]} Failed to castle ${side ? "Queen" : "King"}side!`,
                };
        }
        catch (err) {
            console.log("CASTLING", err);
            return { msg: "ERROR" };
        }
    }
}
exports.SpecialMoves = SpecialMoves;
