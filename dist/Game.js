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
class Game {
    constructor(pieces) {
        this.turnCount = 0;
        if (!pieces)
            this.pieces = Game.makePieces();
        else
            this.pieces = Game.makeCustomPieces(pieces);
    }
    static makePieces() {
        const pieces = {
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
        return pieces;
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
            // else customPieces[`error${i}`] = new Error(Colour[colour], "z", 99 + i);
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
    getPieces() {
        return this.pieces;
    }
    getColourTurn() {
        return this.turnCount % 2 === 0 ? Types_1.Colour[0] : Types_1.Colour[1];
    }
    incTurnCount() {
        this.turnCount++;
    }
    isPieceThere(file, rank) {
        for (let piece in this.pieces) {
            const rankCheck = this.pieces[piece].position.position.rank === rank;
            const fileCheck = this.pieces[piece].position.position.file === file;
            if (fileCheck && rankCheck)
                return true;
        }
        return false;
    }
    getAllPositions() {
        return Object.values(this.getPieces()).reduce((array, piece) => {
            if (piece.isCaptured === false)
                array.push(`${piece.position.position.file}${piece.position.position.rank}`);
            return array;
        }, []);
    }
    findKing(colour) {
        const pieceArray = Object.values(this.getPieces());
        const king = pieceArray.filter((piece) => {
            return (piece.colour === Types_1.Colour[colour] && piece.constructor.name === "King");
        });
        return king[0];
    }
    getPiecesThatCanMove(pos, move, colour) {
        const pieceObj = this.getPieces();
        const pieceArray = Object.entries(pieceObj);
        if (this.isKingInCheck(colour)) {
            const { file, rank } = this.findKing(colour).position.position;
            return [`K${file}${rank}`];
        }
        else
            return pieceArray
                .filter(([piecePos, p]) => {
                const result = piecePos[0] === move[0];
                return result;
            })
                .reduce((array, piece) => {
                const [piecePos, p] = piece;
                const m = p.canMoveTo(pos);
                const c = p.colour === Types_1.Colour[colour];
                if (m && c)
                    array.push(piecePos);
                return array;
            }, []);
    }
    capturePiece(capturePiece, targetPiece) {
        const { flagRefObj } = new utils_1.utils().getLetterRefs();
        const positions = this.getAllPositions();
        const { file: capFile, rank: capRank } = capturePiece.position.position;
        const { file, rank } = targetPiece.position.position;
        const pieceObj = this.getPieces();
        const name = capturePiece.constructor.name;
        const flag = flagRefObj[name];
        let canCapture;
        if (capturePiece.constructor.name === "Pawn")
            canCapture = new CaptureClasses_1.Capture(capturePiece, targetPiece, positions).canPawnCapture();
        else
            canCapture = new CaptureClasses_1.Capture(capturePiece, targetPiece, positions).canCapture();
        if (canCapture) {
            new MovementUtils_1.MovementUtils().completeMove(pieceObj, capturePiece, `${flag}${capFile}${Number(capRank)}`);
            targetPiece.isCaptured = true;
            return {
                msg: `${targetPiece.colour} ${targetPiece.constructor.name} on ${file}${rank} Captured!`,
            };
        }
        return { msg: "Could not capture!" };
    }
    isKingInCheck(colour) {
        const pieceArray = Object.values(this.getPieces());
        let isInCheck = false;
        const positions = this.getAllPositions();
        pieceArray.forEach((piece) => {
            const canCapture = new CaptureClasses_1.Capture(piece, this.findKing(colour), positions).canCapture();
            if (canCapture)
                isInCheck = true;
        });
        return isInCheck;
    }
    getSquaresKingCanMoveTo(colour) {
        const pieceObj = this.getPieces();
    }
    // isKingInCheckMate(colour: number): boolean {
    //   const king = this.findKing(colour);
    //   return false;
    // }
    makeMove(move, colour) {
        const { pawnTest } = new utils_1.utils().getRegex();
        const pieceObj = this.getPieces();
        // THIS IS WHERE YOU CHECK IF THE PIECE CAN MOVE
        // GAME says this
        if (pawnTest.test(move))
            move = `P${move}`;
        if (move === "0-0" || move === "0-0-0") {
            let side = 0;
            if (move === "0-0-0")
                side = 1;
            return new SpecialMoves_1.SpecialMoves(pieceObj).castle(side, colour, pieceObj);
        }
        // Can piece move here?
        const newPosition = new PiecesAndPosition_1.Position(move[1], Number(move[2]));
        const pieceThatCanMove = Object.values(pieceObj).reduce((obj, piece) => {
            if (piece.canMoveTo(newPosition))
                obj = piece;
            return obj;
        });
        try {
            const piece = new MovementUtils_1.MovementUtils().completeMove(pieceObj, pieceThatCanMove, move);
            return { msg: `${piece} moved to ${move[1]}${move[2]}!` };
        }
        catch (err) {
            return { msg: "Fail!", err };
        }
    }
    makeTurn(move) {
        const [white, black] = move.split(" ");
        return [this.makeMove(white, 0), this.makeMove(black, 1)];
    }
}
exports.Game = Game;
