"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Game_isWhiteMove, _Game_pieces;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Bishop_1 = require("./Classes/PieceClasses/Bishop");
const King_1 = require("./Classes/PieceClasses/King");
const Knight_1 = require("./Classes/PieceClasses/Knight");
const Pawn_1 = require("./Classes/PieceClasses/Pawn");
const PiecesAndPosition_1 = require("./Classes/PieceClasses/PiecesAndPosition");
const Queen_1 = require("./Classes/PieceClasses/Queen");
const Rook_1 = require("./Classes/PieceClasses/Rook");
const Types_1 = require("./Types");
const SpecialMoves_1 = require("./Classes/MovementClasses/SpecialMoves");
const utils_1 = require("./utils/utils");
const MovementUtils_1 = require("./Classes/MovementClasses/MovementUtils");
const CaptureClasses_1 = require("./Classes/CaptureClasses");
const Error_1 = require("./Classes/PieceClasses/Error");
const IsPieceInTheWay_1 = require("./Classes/MovementClasses/IsPieceInTheWay");
class Game {
    constructor(pieces) {
        _Game_isWhiteMove.set(this, void 0);
        _Game_pieces.set(this, void 0);
        __classPrivateFieldSet(this, _Game_isWhiteMove, true, "f");
        if (!pieces)
            __classPrivateFieldSet(this, _Game_pieces, Game.makePieces(), "f");
        else
            __classPrivateFieldSet(this, _Game_pieces, Game.makeCustomPieces(pieces), "f");
    }
    static makePieces() {
        return {
            Pa2: new Pawn_1.Pawn(Types_1.Colour[0], "a", 2),
            Pb2: new Pawn_1.Pawn(Types_1.Colour[0], "b", 2),
            Pc2: new Pawn_1.Pawn(Types_1.Colour[0], "c", 2),
            Pd2: new Pawn_1.Pawn(Types_1.Colour[0], "d", 2),
            Pe2: new Pawn_1.Pawn(Types_1.Colour[0], "e", 2),
            Pf2: new Pawn_1.Pawn(Types_1.Colour[0], "f", 2),
            Pg2: new Pawn_1.Pawn(Types_1.Colour[0], "g", 2),
            Ph2: new Pawn_1.Pawn(Types_1.Colour[0], "h", 2),
            Ra1: new Rook_1.Rook(Types_1.Colour[0], "a", 1),
            Nb1: new Knight_1.Knight(Types_1.Colour[0], "b", 1),
            Bc1: new Bishop_1.Bishop(Types_1.Colour[0], "c", 1),
            Qd1: new Queen_1.Queen(Types_1.Colour[0], "d", 1),
            Ke1: new King_1.King(Types_1.Colour[0], "e", 1),
            Bf1: new Bishop_1.Bishop(Types_1.Colour[0], "f", 1),
            Ng1: new Knight_1.Knight(Types_1.Colour[0], "g", 1),
            Rh1: new Rook_1.Rook(Types_1.Colour[0], "h", 1),
            Pa7: new Pawn_1.Pawn(Types_1.Colour[1], "a", 7),
            Pb7: new Pawn_1.Pawn(Types_1.Colour[1], "b", 7),
            Pc7: new Pawn_1.Pawn(Types_1.Colour[1], "c", 7),
            Pd7: new Pawn_1.Pawn(Types_1.Colour[1], "d", 7),
            Pe7: new Pawn_1.Pawn(Types_1.Colour[1], "e", 7),
            Pf7: new Pawn_1.Pawn(Types_1.Colour[1], "f", 7),
            Pg7: new Pawn_1.Pawn(Types_1.Colour[1], "g", 7),
            Ph7: new Pawn_1.Pawn(Types_1.Colour[1], "h", 7),
            Ra8: new Rook_1.Rook(Types_1.Colour[1], "a", 8),
            Nb8: new Knight_1.Knight(Types_1.Colour[1], "b", 8),
            Bc8: new Bishop_1.Bishop(Types_1.Colour[1], "c", 8),
            Qd8: new Queen_1.Queen(Types_1.Colour[1], "d", 8),
            Ke8: new King_1.King(Types_1.Colour[1], "e", 8),
            Bf8: new Bishop_1.Bishop(Types_1.Colour[1], "f", 8),
            Ng8: new Knight_1.Knight(Types_1.Colour[1], "g", 8),
            Rh8: new Rook_1.Rook(Types_1.Colour[1], "h", 8),
        };
    }
    static makeCustomPiece(name, colour, f, r) {
        const ref = {
            P: new Pawn_1.Pawn(Types_1.Colour[colour], f, r),
            R: new Rook_1.Rook(Types_1.Colour[colour], f, r),
            N: new Knight_1.Knight(Types_1.Colour[colour], f, r),
            Q: new Queen_1.Queen(Types_1.Colour[colour], f, r),
            K: new King_1.King(Types_1.Colour[colour], f, r),
            B: new Bishop_1.Bishop(Types_1.Colour[colour], f, r),
        };
        return ref[name];
    }
    static makeCustomPieces(pieces) {
        const { pawnTest, fileReg, rankReg, nameTest } = utils_1.utils.getRegex();
        const customPieces = {};
        pieces.forEach(({ piece, colour }, i) => {
            const f = piece.match(fileReg)[0];
            const r = piece.match(rankReg)[0];
            if (pawnTest.test(piece))
                piece = `P${piece}`;
            const n = piece.match(nameTest)[0];
            const posCheck = Object.keys(customPieces).map((coord) => `${coord[1]}${coord[2]}`);
            if (!customPieces.hasOwnProperty(piece) && !posCheck.includes(`${f}${r}`))
                customPieces[piece] = Game.makeCustomPiece(n, colour, f, Number(r));
            else
                customPieces[`error${i}`] = new Error_1.ErrorPiece(Types_1.Colour[colour], "z", 99 + i);
        });
        return customPieces;
    }
    get pieces() {
        return __classPrivateFieldGet(this, _Game_pieces, "f");
    }
    get isWhiteMove() {
        return __classPrivateFieldGet(this, _Game_isWhiteMove, "f");
    }
    set isWhiteMove(value) {
        __classPrivateFieldSet(this, _Game_isWhiteMove, value, "f");
    }
    makeMove(move, colour) {
        const { pawnTest, dubiousFile, dubiousRank } = utils_1.utils.getRegex();
        if (pawnTest.test(move))
            move = `P${move}`;
        if (move === "0-0" || move === "0-0-0") {
            let side = move === "0-0" ? 0 : 1;
            return SpecialMoves_1.SpecialMoves.castle(side, colour, this.pieces);
        }
        let destiPos, destiRankFile, isPieceInWay;
        const isDubiousFile = dubiousFile.test(move);
        const isDubiousRank = dubiousRank.test(move);
        if (isDubiousFile || isDubiousRank) {
            destiPos = new PiecesAndPosition_1.Position(move[2], Number(move[3]));
            destiRankFile = `${move[2]}${move[3]}`;
        }
        else {
            destiPos = new PiecesAndPosition_1.Position(move[1], Number(move[2]));
            destiRankFile = `${move[1]}${move[2]}`;
        }
        const pieceThatCanMove = this.getPiece(destiPos, move, colour);
        const canMoveTo = pieceThatCanMove.canMoveTo(destiPos);
        if (pieceThatCanMove.constructor.name === "Knight" &&
            pieceThatCanMove.canMoveTo(destiPos))
            isPieceInWay = false;
        else
            isPieceInWay =
                IsPieceInTheWay_1.IsPieceInTheWay.checkBoth(pieceThatCanMove.position, destiPos, this.pieces) && canMoveTo;
        if (!isPieceInWay)
            try {
                const piece = MovementUtils_1.MovementUtils.completeMove(this.pieces, pieceThatCanMove, destiPos);
                this.isWhiteMove = !this.isWhiteMove;
                return { msg: `${piece} moved to ${destiRankFile}!` };
            }
            catch (err) {
                return { msg: "Fail!", err };
            }
        else
            return { msg: "Fail!" };
    }
    makeTurn(move) {
        const [white, black] = move.split(" ");
        return [this.makeMove(white, 0), this.makeMove(black, 1)];
    }
    isPieceThere(position) {
        const { rank, file } = position.position;
        for (let piece in __classPrivateFieldGet(this, _Game_pieces, "f")) {
            const rankCheck = __classPrivateFieldGet(this, _Game_pieces, "f")[piece].position.position.rank === rank;
            const fileCheck = __classPrivateFieldGet(this, _Game_pieces, "f")[piece].position.position.file === file;
            if (fileCheck && rankCheck)
                return true;
        }
        return false;
    }
    findKing(colour) {
        const pieceArray = Object.values(this.pieces);
        const king = pieceArray.filter((piece) => {
            return (piece.colour === Types_1.Colour[colour] && piece.constructor.name === "King");
        });
        return king[0];
    }
    getPiece(positionMovingTo, move, colour) {
        const { dubiousFile, dubiousRank } = utils_1.utils.getRegex();
        const pieceObj = this.pieces;
        const pieceArray = Object.entries(pieceObj);
        let match;
        let dubiousFileChar = "";
        let dubiousRankChar = "";
        if (dubiousFile.test(move)) {
            dubiousFileChar = move[1];
            move = `${move[0]}${move[2]}${move[3]}`;
        }
        if (dubiousRank.test(move)) {
            dubiousRankChar = move[1];
            move = `${move[0]}${move[2]}${move[3]}`;
        }
        const finalPiece = pieceArray.reduce((object, piece) => {
            let [piecePos, p] = piece;
            const k = piecePos[0] === move[0];
            const m = p.canMoveTo(positionMovingTo);
            const c = p.colour === Types_1.Colour[colour];
            if (dubiousFileChar)
                match = piecePos[1] === dubiousFileChar;
            if (dubiousRankChar)
                match = piecePos[2] === dubiousRankChar;
            if (dubiousFileChar || dubiousRankChar) {
                if (m && c && k && match)
                    object = p;
            }
            else {
                if (m && c && k)
                    object = p;
            }
            return object;
        }, {});
        return finalPiece;
    }
    capturePiece(capturePiece, targetPiece) {
        const { file, rank } = targetPiece.position.position;
        const pieceObj = this.pieces;
        let canCapture;
        if (capturePiece.constructor.name === "Pawn")
            canCapture = CaptureClasses_1.Capture.canPawnCapture(capturePiece, targetPiece);
        else if (capturePiece.constructor.name === "Pawn" &&
            targetPiece.constructor.name === "Pawn" &&
            targetPiece.position.position.rank === targetPiece.position.position.rank)
            canCapture = CaptureClasses_1.Capture.canEnPassant(capturePiece, targetPiece);
        else
            canCapture = CaptureClasses_1.Capture.canCapture(capturePiece, targetPiece);
        if (canCapture) {
            MovementUtils_1.MovementUtils.completeMove(pieceObj, capturePiece, targetPiece.position);
            targetPiece.isCaptured = true;
            return {
                msg: `${targetPiece.colour} ${targetPiece.constructor.name} on ${file}${rank} Captured!`,
            };
        }
        return { msg: "Could not capture!" };
    }
    isKingInCheck(colour) {
        let isInCheck = false;
        for (let piece in this.pieces) {
            const canCapture = CaptureClasses_1.Capture.canCapture(this.pieces[piece], this.findKing(colour));
            if (canCapture)
                isInCheck = true;
        }
        return isInCheck;
    }
    canCheckBeRuined(colour) {
        let canPieceBlock = false;
        let canPieceBeTaken = false;
        const { letterRef, files } = utils_1.utils.getLetterRefs();
        const king = this.findKing(colour);
        const capturePieces = [];
        for (let piece in this.pieces) {
            const capPiece = this.pieces[piece];
            const canCapture = CaptureClasses_1.Capture.canCapture(capPiece, king);
            if (canCapture)
                capturePieces.push(capPiece);
        }
        const kingPos = king.position;
        const otherPos = capturePieces[0].position;
        const { rank, file } = kingPos.distanceFrom(otherPos);
        const direction = utils_1.utils.checkDirection(file, rank);
        const positionsBetween = [];
        const minRank = Math.min(otherPos.position.rank, kingPos.position.rank);
        const maxRank = Math.max(otherPos.position.rank, kingPos.position.rank);
        const minFile = Math.min(letterRef[kingPos.position.file], letterRef[otherPos.position.file]);
        const maxFile = Math.max(letterRef[kingPos.position.file], letterRef[otherPos.position.file]);
        if (direction === "N" || direction === "S")
            for (let r = minRank + 1; r < maxRank - 1; r++)
                positionsBetween.push(new PiecesAndPosition_1.Position(otherPos.position.file, r));
        if (direction === "W" || direction === "E")
            for (let f = minFile + 1; f < maxFile - 1; f++)
                positionsBetween.push(new PiecesAndPosition_1.Position(files[f], otherPos.position.rank));
        if (direction === "NE")
            for (let f = letterRef[otherPos.position.file] + 1, r = otherPos.position.rank + 1; f < letterRef[kingPos.position.file], r < kingPos.position.rank; f++, r++) {
                positionsBetween.push(new PiecesAndPosition_1.Position(files[f], r));
            }
        if (direction === "NW")
            for (let f = letterRef[otherPos.position.file] - 1, r = otherPos.position.rank + 1; f > letterRef[kingPos.position.file], r < kingPos.position.rank; f--, r++) {
                positionsBetween.push(new PiecesAndPosition_1.Position(files[f], r));
            }
        if (direction === "SW")
            for (let f = letterRef[otherPos.position.file] - 1, r = otherPos.position.rank - 1; f > letterRef[kingPos.position.file], r > kingPos.position.rank; f--, r--)
                positionsBetween.push(new PiecesAndPosition_1.Position(files[f], r));
        if (direction === "SE")
            for (let f = letterRef[otherPos.position.file] + 1, r = otherPos.position.rank - 1; f < letterRef[kingPos.position.file], r > kingPos.position.rank; f++, r--)
                positionsBetween.push(new PiecesAndPosition_1.Position(files[f], r));
        for (let piece in this.pieces) {
            const capPiece = this.pieces[piece];
            const isSameColour = CaptureClasses_1.Capture.isPieceSameColour(capPiece, king);
            positionsBetween.forEach((pos) => {
                const canMoveTo = capPiece.canMoveTo(pos);
                if (canMoveTo && isSameColour)
                    canPieceBlock = true;
            });
        }
        for (let piece in this.pieces) {
            const capPiece = this.pieces[piece];
            const canCapture = CaptureClasses_1.Capture.canCapture(capPiece, capturePieces[0]);
            if (canCapture)
                canPieceBeTaken = true;
        }
        return { canPieceBlock, canPieceBeTaken };
    }
    canKingMoveThere(colour, pos) {
        const king = this.findKing(colour);
        const positions = utils_1.utils.generateKingSquares(king);
    }
    canKingMoveOutOfCheck(colour) {
        const king = this.findKing(colour);
        const positions = utils_1.utils.generateKingSquares(king);
        const values = Object.values(this.pieces);
        return positions.some((pos) => {
            return !values.some((piece) => {
                const isKing = piece === king;
                const isDifferentColour = !CaptureClasses_1.Capture.isPieceSameColour(piece, king);
                const canMove = piece.canMoveTo(pos);
                return canMove && isDifferentColour && !isKing;
            });
        });
    }
    isKingInCheckMate(colour) {
        const isKingInCheck = this.isKingInCheck(colour);
        const canKingMoveOutOfCheck = this.canKingMoveOutOfCheck(colour);
        const { canPieceBlock, canPieceBeTaken } = this.canCheckBeRuined(colour);
        return (isKingInCheck &&
            !canKingMoveOutOfCheck &&
            !canPieceBlock &&
            !canPieceBeTaken);
    }
}
exports.Game = Game;
_Game_isWhiteMove = new WeakMap(), _Game_pieces = new WeakMap();
