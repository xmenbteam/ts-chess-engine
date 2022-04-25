"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rankReg = exports.fileReg = exports.pieceTest = exports.pawnTest = exports.ranks = exports.files = exports.letterRef = void 0;
exports.letterRef = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7,
};
exports.files = ["a", "b", "c", "d", "e", "f", "g", "h"];
exports.ranks = [1, 2, 3, 4, 5, 6, 7, 8];
exports.pawnTest = /^[a-h]\d$/;
exports.pieceTest = /^[RNQBK][a-h]\d$/;
exports.fileReg = /[a-h]/;
exports.rankReg = /[1-8]/;
