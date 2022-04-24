"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Bishop_1 = require("./Pieces/Bishop");
const King_1 = require("./Pieces/King");
const Knight_1 = require("./Pieces/Knight");
const Pawn_1 = require("./Pieces/Pawn");
const PiecesAndPosition_1 = require("./Pieces/PiecesAndPosition");
const Queen_1 = require("./Pieces/Queen");
const Rook_1 = require("./Pieces/Rook");
const Types_1 = require("./Types");
const utils_1 = require("./utils/utils");
class Game {
    constructor() {
        this.turnCount = 0;
        this.pieces = Game.makePieces();
    }
    static makePieces() {
        const pieces = {
            a2: new Pawn_1.Pawn(Types_1.Colour[0], "a", 2),
            b2: new Pawn_1.Pawn(Types_1.Colour[0], "b", 2),
            c2: new Pawn_1.Pawn(Types_1.Colour[0], "c", 2),
            d2: new Pawn_1.Pawn(Types_1.Colour[0], "d", 2),
            e2: new Pawn_1.Pawn(Types_1.Colour[0], "e", 2),
            f2: new Pawn_1.Pawn(Types_1.Colour[0], "f", 2),
            g2: new Pawn_1.Pawn(Types_1.Colour[0], "g", 2),
            h2: new Pawn_1.Pawn(Types_1.Colour[0], "h", 2),
            Ra1: new Rook_1.Rook(Types_1.Colour[0], "a", 1),
            Nb1: new Knight_1.Knight(Types_1.Colour[0], "b", 1),
            Bc1: new Bishop_1.Bishop(Types_1.Colour[0], "c", 1),
            Qd1: new Queen_1.Queen(Types_1.Colour[0], "d", 1),
            Ke1: new King_1.King(Types_1.Colour[0], "e", 1),
            Bf1: new Bishop_1.Bishop(Types_1.Colour[0], "f", 1),
            Ng1: new Knight_1.Knight(Types_1.Colour[0], "g", 1),
            Rh1: new Rook_1.Rook(Types_1.Colour[0], "h", 1),
            a7: new Pawn_1.Pawn(Types_1.Colour[1], "a", 7),
            b7: new Pawn_1.Pawn(Types_1.Colour[1], "b", 7),
            c7: new Pawn_1.Pawn(Types_1.Colour[1], "c", 7),
            d7: new Pawn_1.Pawn(Types_1.Colour[1], "d", 7),
            e7: new Pawn_1.Pawn(Types_1.Colour[1], "e", 7),
            f7: new Pawn_1.Pawn(Types_1.Colour[1], "f", 7),
            g7: new Pawn_1.Pawn(Types_1.Colour[1], "g", 7),
            h7: new Pawn_1.Pawn(Types_1.Colour[1], "h", 7),
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
            const rankCheck = this.pieces[piece].position.getPosition().rank === rank;
            const fileCheck = this.pieces[piece].position.getPosition().file === file;
            if (fileCheck && rankCheck)
                return true;
        }
        return false;
    }
    isPieceSameColour(pieceOne, pieceTwo) {
        const p1Colour = pieceOne.getColour();
        const p2Colour = pieceTwo.getColour();
        return p1Colour === p2Colour ? true : false;
    }
    getAllPositions() {
        return Object.values(this.getPieces()).reduce((array, piece) => {
            array.push(`${piece.position.getPosition().file}${piece.position.getPosition().rank}`);
            return array;
        }, []);
    }
    isPieceInTheWay(piece, newPosition) {
        if (piece.constructor.name === "Knight")
            return false;
        const { file: newFile, rank: newRank } = newPosition.getPosition();
        const { file: pieceFile, rank: pieceRank } = piece.position.getPosition();
        const allPieces = this.getAllPositions();
        const piecePosition = `${pieceFile}${pieceRank}`;
        const minRank = Math.min(pieceRank, newRank);
        const maxRank = Math.max(pieceRank, newRank);
        const minFile = Math.min(utils_1.letterRef[pieceFile], utils_1.letterRef[newFile]);
        const maxFile = Math.max(utils_1.letterRef[pieceFile], utils_1.letterRef[newFile]);
        const positions = [];
        for (let i = minFile; i <= maxFile; i++) {
            const fileRank = `${utils_1.files[i]}${minRank}`;
            positions.push(fileRank);
        }
        for (let i = minRank - 1; i < maxRank; i++) {
            if (!positions[i])
                positions[i] = positions[0][0];
            positions[i] = `${positions[i][0]}${(i + 1).toString()}`;
        }
        const notStartingSquare = positions.filter((position) => position !== piecePosition);
        for (let i = 0; i < notStartingSquare.length; i++)
            if (allPieces.includes(notStartingSquare[i]))
                return true;
        return false;
    }
    makeMove(move) {
        const moveArray = move.split(" ");
        const pieceObj = this.getPieces();
        let flag = "";
        moveArray.forEach((move, i) => {
            const f = move.match(utils_1.fileReg)[0];
            const r = move.match(utils_1.rankReg)[0];
            const pos = new PiecesAndPosition_1.Position(f, Number(r));
            for (let piece in pieceObj) {
                if (pieceObj[piece].canMoveTo(pos) &&
                    pieceObj[piece].getColour() === Types_1.Colour[i] &&
                    !this.isPieceInTheWay(pieceObj[piece], pos) &&
                    piece[0] === move[0]) {
                    if (utils_1.pieceTest.test(piece))
                        flag = piece[0];
                    if (!pieceObj[piece].getHasMoved())
                        pieceObj[piece].setHasMoved();
                    pieceObj[piece].position.setPosition(f, Number(r));
                    pieceObj[`${flag}${f}${r}`] = pieceObj[piece];
                    delete pieceObj[piece];
                }
            }
        });
    }
}
exports.Game = Game;
