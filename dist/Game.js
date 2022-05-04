"use strict";
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
        this._isWhiteMove = true;
        if (!pieces)
            this._pieces = Game.makePieces();
        else
            this._pieces = Game.makeCustomPieces(pieces);
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
    static makeCustomPieces(pieces) {
        const { pawnTest, fileReg, rankReg, nameTest } = new utils_1.utils().getRegex();
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
    get pieces() {
        return this._pieces;
    }
    get isWhiteMove() {
        return this._isWhiteMove;
    }
    set isWhiteMove(value) {
        this._isWhiteMove = value;
    }
    isPieceThere(position) {
        const { rank, file } = position.position;
        for (let piece in this._pieces) {
            const rankCheck = this._pieces[piece].position.position.rank === rank;
            const fileCheck = this._pieces[piece].position.position.file === file;
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
        const { dubiousFile, dubiousRank } = new utils_1.utils().getRegex();
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
        const { flagRefObj } = new utils_1.utils().getLetterRefs();
        const { file: capFile, rank: capRank } = capturePiece.position.position;
        const { file, rank } = targetPiece.position.position;
        const pieceObj = this.pieces;
        const name = capturePiece.constructor.name;
        const flag = flagRefObj[name];
        let canCapture;
        if (capturePiece.constructor.name === "Pawn")
            canCapture = new CaptureClasses_1.Capture().canPawnCapture(capturePiece, targetPiece);
        else
            canCapture = new CaptureClasses_1.Capture().canCapture(capturePiece, targetPiece);
        if (canCapture) {
            new MovementUtils_1.MovementUtils().completeMove(pieceObj, capturePiece, targetPiece.position, `${flag}${capFile}${capRank}`);
            targetPiece.isCaptured = true;
            return {
                msg: `${targetPiece.colour} ${targetPiece.constructor.name} on ${file}${rank} Captured!`,
            };
        }
        return { msg: "Could not capture!" };
    }
    isKingInCheck(colour) {
        const pieceArray = Object.values(this.pieces);
        let isInCheck = false;
        pieceArray.forEach((piece) => {
            const canCapture = new CaptureClasses_1.Capture().canCapture(piece, this.findKing(colour));
            if (canCapture)
                isInCheck = true;
        });
        return isInCheck;
    }
    makeMove(move, colour) {
        const { pawnTest, dubiousFile, dubiousRank } = new utils_1.utils().getRegex();
        if (pawnTest.test(move))
            move = `P${move}`;
        if (move === "0-0" || move === "0-0-0") {
            let side = 0;
            if (move === "0-0-0")
                side = 1;
            return new SpecialMoves_1.SpecialMoves(this.pieces).castle(side, colour, this.pieces);
        }
        // Can piece move here?
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
        if (pieceThatCanMove.constructor.name === "Knight" &&
            pieceThatCanMove.canMoveTo(destiPos))
            isPieceInWay = false;
        else
            isPieceInWay = new IsPieceInTheWay_1.IsPieceInTheWay(pieceThatCanMove.position, destiPos, this.pieces).checkBoth();
        if (!isPieceInWay)
            try {
                const piece = new MovementUtils_1.MovementUtils().completeMove(this.pieces, pieceThatCanMove, destiPos, move);
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
}
exports.Game = Game;
