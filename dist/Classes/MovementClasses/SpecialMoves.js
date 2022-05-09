"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialMoves = void 0;
const PiecesAndPosition_1 = require("../PieceClasses/PiecesAndPosition");
const Types_1 = require("../../Types");
const IsPieceInTheWay_1 = require("./IsPieceInTheWay");
const utils_1 = require("../../utils/utils");
const MovementUtils_1 = require("./MovementUtils");
class SpecialMoves {
    constructor(pieces) {
        this.pieces = pieces;
    }
    castle(side, colour, pieceObj) {
        const castleRefObj = utils_1.utils.getCastleRef();
        const { oldKingCoord, oldRookCoord, newKingFile, newRookFile, rank } = castleRefObj;
        if (pieceObj[oldKingCoord[colour]].constructor.name !== "King")
            throw new Error();
        if (pieceObj[oldRookCoord[colour][side]].constructor.name !== "Rook")
            throw new Error();
        const king = pieceObj[oldKingCoord[colour]];
        const rook = pieceObj[oldRookCoord[colour][side]];
        const newKingPos = new PiecesAndPosition_1.Position(newKingFile[side], rank[colour]);
        const newRookPos = new PiecesAndPosition_1.Position(newRookFile[side], rank[colour]);
        const oldKingPos = this.pieces[oldKingCoord[colour]].position;
        const oldRookPos = this.pieces[oldRookCoord[colour][side]].position;
        const isPieceInWayKing = IsPieceInTheWay_1.IsPieceInTheWay.checkRankAndFile(oldKingPos, newKingPos, this.pieces);
        const isPieceInWayRook = IsPieceInTheWay_1.IsPieceInTheWay.checkRankAndFile(oldRookPos, newRookPos, this.pieces);
        const hasNotMoved = !king.hasMoved && !rook.hasMoved;
        try {
            if (hasNotMoved && !isPieceInWayKing && !isPieceInWayRook) {
                MovementUtils_1.MovementUtils.completeCastle(king, colour, side, this.pieces);
                MovementUtils_1.MovementUtils.completeCastle(rook, colour, side, this.pieces);
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
