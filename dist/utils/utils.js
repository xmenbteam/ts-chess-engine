"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
class utils {
    constructor() {
        this.letterRef = {
            a: 0,
            b: 1,
            c: 2,
            d: 3,
            e: 4,
            f: 5,
            g: 6,
            h: 7,
        };
        this.flagRefObj = {
            Knight: "N",
            Bishop: "B",
            Pawn: "P",
            Queen: "Q",
            King: "K",
            Rook: "R",
        };
        this.HasMovedPieces = ["King", "Rook", "Pawn"];
        this.files = ["a", "b", "c", "d", "e", "f", "g", "h"];
        // private ranks: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
        this.pawnTest = /^[a-h]\d$/;
        this.pieceTest = /^[RNQBK][a-h]\d$/;
        this.nameTest = /[RNBQKP]/;
        this.fileReg = /[a-h]/;
        this.rankReg = /[1-8]/;
        this.dubiousPieceFileReg = /^[RNQBK][a-h]{2}[1-8]$/;
        this.dubiousPieceRankReg = /^[RNQBK][1-8][a-h][1-8]$/;
        this.castleRefObj = {
            oldKingCoord: ["Ke1", "Ke8"],
            oldRookCoord: [
                ["Rh1", "Ra1"],
                ["Rh8", "Ra8"],
            ],
            newKingFile: ["g", "c"],
            newRookFile: ["f", "d"],
            rank: [1, 8],
        };
    }
    static diagonalDirRef(pieceFileDist, pieceRankDist) {
        let direction = "";
        const directionRef = {
            NE: pieceFileDist > 0 && pieceRankDist > 0,
            SE: pieceFileDist > 0 && pieceRankDist < 0,
            NW: pieceFileDist < 0 && pieceRankDist > 0,
            SW: pieceFileDist < 0 && pieceRankDist < 0,
        };
        for (const [dir, cond] of Object.entries(directionRef)) {
            if (cond)
                direction = dir;
        }
        return direction;
    }
    static rankAndFileDirRef(pieceFileDist, pieceRankDist) {
        let direction = "";
        const refObj = {
            N: !pieceFileDist && pieceRankDist > 0,
            S: !pieceFileDist && pieceRankDist < 0,
            E: !pieceRankDist && pieceFileDist > 0,
            W: !pieceRankDist && pieceFileDist < 0,
        };
        for (const [dir, cond] of Object.entries(refObj)) {
            if (cond)
                direction = dir;
        }
        return direction;
    }
    static getLetterRefs() {
        return {
            letterRef: new utils().letterRef,
            files: new utils().files,
            // ranks: new utils().ranks,
            flagRefObj: new utils().flagRefObj,
        };
    }
    static getRegex() {
        return {
            pawnTest: new utils().pawnTest,
            pieceTest: new utils().pieceTest,
            fileReg: new utils().fileReg,
            rankReg: new utils().rankReg,
            nameTest: new utils().nameTest,
            dubiousFile: new utils().dubiousPieceFileReg,
            dubiousRank: new utils().dubiousPieceRankReg,
        };
    }
    static getCastleRef() {
        return new utils().castleRefObj;
    }
    static piecesThatNeedMoved() {
        return new utils().HasMovedPieces;
    }
}
exports.utils = utils;
