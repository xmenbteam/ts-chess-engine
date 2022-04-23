"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchFunc = exports.pawnTest = exports.ranks = exports.files = exports.letterRef = void 0;
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
// export const chessConverter = (string: string) => {};
exports.pawnTest = /^[a-h][1-8]/;
const switchFunc = (thing, object) => {
    const entries = Object.entries(object);
    for (const [key, value] of entries) {
        if (key === thing)
            return typeof value === "function" ? value() : value;
    }
    return "Not worked!";
};
exports.switchFunc = switchFunc;
