"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialMoves = exports.CanMoveToSquare = exports.IsPieceInTheWay = void 0;
const PiecesAndPosition_1 = require("../Pieces/PiecesAndPosition");
const Types_1 = require("../Types");
const utils_1 = require("./utils");
class IsPieceInTheWay {
    constructor(piecePos, newPos, positions) {
        this.isInWay = false;
        this.piecePos = piecePos;
        this.newPos = newPos;
        this.positions = positions;
        this.pieceCoords = "";
        this.ignoreYourself = [];
        this.wrongSquares = [];
    }
    checkRankAndFile() {
        const { file, rank } = this.piecePos;
        const { file: newFile, rank: newRank } = this.newPos;
        this.pieceCoords = `${file}${rank}`;
        this.ignoreYourself = this.positions.filter((p) => p !== this.pieceCoords);
        const minFile = Math.min(utils_1.letterRef[file], utils_1.letterRef[newFile]);
        const maxFile = Math.max(utils_1.letterRef[file], utils_1.letterRef[newFile]);
        const minRank = Math.min(rank, newRank);
        const maxRank = Math.max(rank, newRank);
        for (let i = minRank; i <= maxRank; i++) {
            const square = `${file}${i}`;
            if (this.ignoreYourself.includes(square))
                this.isInWay = true;
        }
        for (let i = minFile; i <= maxFile; i++) {
            const square = `${utils_1.files[i]}${rank}`;
            if (this.ignoreYourself.includes(square))
                this.isInWay = true;
        }
        return this.isInWay;
    }
    checkDiagonal() {
        const { file, rank } = this.piecePos;
        const { file: newFile, rank: newRank } = this.newPos;
        this.pieceCoords = `${file}${rank}`;
        this.ignoreYourself = this.positions.filter((p) => p !== this.pieceCoords);
        let direction = "";
        const directionRef = {
            NE: newRank > rank && utils_1.letterRef[newFile] > utils_1.letterRef[file],
            SE: newRank < rank && utils_1.letterRef[newFile] > utils_1.letterRef[file],
            NW: newRank > rank && utils_1.letterRef[newFile] < utils_1.letterRef[file],
            SW: newRank < rank && utils_1.letterRef[newFile] < utils_1.letterRef[file],
        };
        for (const [dir, cond] of Object.entries(directionRef)) {
            if (cond)
                direction = dir;
        }
        if (direction === "SE") {
            for (let i = utils_1.letterRef[file], j = rank; i <= utils_1.letterRef[newFile] && j > 0; i++, j--) {
                const square = `${utils_1.files[i]}${j}`;
                if (this.ignoreYourself.includes(square))
                    this.isInWay = true;
            }
        }
        if (direction === "NE") {
            for (let i = utils_1.letterRef[file], j = rank; i <= utils_1.letterRef[newFile] && j <= 8; i++, j++) {
                const square = `${utils_1.files[i]}${j}`;
                if (this.ignoreYourself.includes(square))
                    this.isInWay = true;
            }
        }
        if (direction === "SW") {
            for (let i = utils_1.letterRef[file], j = rank; i >= utils_1.letterRef[newFile] && j > 0; i--, j--) {
                const square = `${utils_1.files[i]}${j}`;
                if (this.ignoreYourself.includes(square))
                    this.isInWay = true;
            }
        }
        if (direction === "NW") {
            for (let i = utils_1.letterRef[file], j = rank; i >= utils_1.letterRef[newFile] && j <= 8; i--, j++) {
                const square = `${utils_1.files[i]}${j}`;
                if (this.ignoreYourself.includes(square))
                    this.isInWay = true;
            }
        }
        return this.isInWay;
    }
    checkBoth() {
        const { file, rank } = this.piecePos;
        const { file: newFile, rank: newRank } = this.newPos;
        if (file === newFile || rank === newRank)
            this.checkRankAndFile();
        else
            this.checkDiagonal();
        return this.isInWay;
    }
    checkKingMove() {
        const { file, rank } = this.piecePos;
        this.ignoreYourself = this.positions.filter((p) => p !== this.pieceCoords);
        this.wrongSquares = [
            `${utils_1.files[utils_1.letterRef[file] - 1]}${rank}`,
            `${utils_1.files[utils_1.letterRef[file] - 1]}${rank + 1}`,
            `${utils_1.files[utils_1.letterRef[file]]}${rank + 1}`,
            `${utils_1.files[utils_1.letterRef[file] + 1]}${rank + 1}`,
            `${utils_1.files[utils_1.letterRef[file] + 1]}${rank}`,
            `${utils_1.files[utils_1.letterRef[file] + 1]}${rank - 1}`,
            `${utils_1.files[utils_1.letterRef[file]]}${rank - 1}`,
            `${utils_1.files[utils_1.letterRef[file] - 1]}${rank - 1}`,
        ];
        this.wrongSquares.forEach((squ) => {
            if (this.ignoreYourself.includes(squ))
                this.isInWay = true;
        });
        return this.isInWay;
    }
    checkPawnMove() {
        const { file: newFile, rank: newRank } = this.newPos;
        this.ignoreYourself = this.positions.filter((p) => p !== this.pieceCoords);
        this.isInWay = this.ignoreYourself.includes(`${newFile}${newRank}`);
        return this.isInWay;
    }
}
exports.IsPieceInTheWay = IsPieceInTheWay;
class CanMoveToSquare {
    constructor(distance) {
        this.canMove = false;
        this.distance = distance;
    }
    queen() {
        const { file, rank } = this.distance;
        if (!file || !rank || Math.abs(file) === Math.abs(rank))
            this.canMove = true;
        return this.canMove;
    }
    bishop() {
        const { file, rank } = this.distance;
        if (Math.abs(file) === Math.abs(rank))
            this.canMove = true;
        return this.canMove;
    }
    king() {
        const { file, rank } = this.distance;
        if ((Math.abs(file) === 1 && Math.abs(rank) === 1) ||
            (Math.abs(file) === 1 && !Math.abs(rank)) ||
            (!Math.abs(file) && Math.abs(rank) === 1))
            this.canMove = true;
        return this.canMove;
    }
    knight() {
        const { file, rank } = this.distance;
        if ((Math.abs(file) === 2 && Math.abs(rank) === 1) ||
            (Math.abs(file) === 1 && Math.abs(rank) === 2))
            this.canMove = true;
        return this.canMove;
    }
    pawn(hasMoved) {
        const { file, rank } = this.distance;
        if ((!file && Math.abs(rank) === 1) ||
            (!file && Math.abs(rank) === 2 && !hasMoved))
            this.canMove = true;
        return this.canMove;
    }
    rook() {
        const { file, rank } = this.distance;
        if (!file || !rank)
            this.canMove = true;
        return this.canMove;
    }
}
exports.CanMoveToSquare = CanMoveToSquare;
class SpecialMoves {
    constructor(pieces) {
        this.pieces = pieces;
    }
    // KING IS 0, QUEEN IS 1
    // [colour][side]
    castle(side, colour, positions) {
        const castleRefObj = {
            oldKingCoord: ["Ke1", "Ke8"],
            oldRookCoord: [
                ["Rh1", "Ra1"],
                ["Rh8", "Ra8"],
            ],
            newKingFile: ["g", "c"],
            newRookFile: ["f", "d"],
            rank: [1, 8],
        };
        const { oldKingCoord, oldRookCoord, newKingFile, newRookFile, rank } = castleRefObj;
        const newKingPos = new PiecesAndPosition_1.Position(newKingFile[side], rank[colour]).getPosition();
        const newRookPos = new PiecesAndPosition_1.Position(newRookFile[side], rank[colour]).getPosition();
        const oldKingPos = this.pieces[oldKingCoord[colour]].position.getPosition();
        const oldRookPos = this.pieces[oldRookCoord[colour][side]].position.getPosition();
        const isPieceInWayKing = new IsPieceInTheWay(oldKingPos, newKingPos, positions).checkRankAndFile();
        const isPieceInWayRook = new IsPieceInTheWay(oldRookPos, newRookPos, positions).checkRankAndFile();
        const hasNotMoved = !this.pieces[oldKingCoord[colour]].getHasMoved() &&
            !this.pieces[oldRookCoord[colour][side]].getHasMoved();
        const king = this.pieces[oldKingCoord[colour]];
        const rook = this.pieces[oldRookCoord[colour][side]];
        // try {
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
        // } catch (err) {
        //   console.log("CASTLING", err);
        //   return { msg: "ERROR" };
        // }
    }
}
exports.SpecialMoves = SpecialMoves;
