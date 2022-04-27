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
        this.files = ["a", "b", "c", "d", "e", "f", "g", "h"];
        this.ranks = [1, 2, 3, 4, 5, 6, 7, 8];
        this.pawnTest = /^[a-h]\d$/;
        this.pieceTest = /^[RNQBK][a-h]\d$/;
        this.nameTest = /[RNBQK]/;
        this.fileReg = /[a-h]/;
        this.rankReg = /[1-8]/;
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
    getLetterRefs() {
        return {
            letterRef: this.letterRef,
            files: this.files,
            ranks: this.ranks,
        };
    }
    getRegex() {
        return {
            pawnTest: this.pawnTest,
            pieceTest: this.pieceTest,
            fileReg: this.fileReg,
            rankReg: this.rankReg,
            nameTest: this.nameTest,
        };
    }
    getCastleRef() {
        return this.castleRefObj;
    }
}
exports.utils = utils;
