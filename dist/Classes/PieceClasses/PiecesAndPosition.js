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
var _Position_position, _Piece_colour, _Piece_isCaptured;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Piece = exports.Position = void 0;
const utils_1 = require("../../utils/utils");
class Position {
    constructor(file, rank) {
        _Position_position.set(this, void 0);
        __classPrivateFieldSet(this, _Position_position, { file, rank }, "f");
    }
    distanceFrom(otherPosition) {
        const { letterRef } = utils_1.utils.getLetterRefs();
        const fileDiff = letterRef[__classPrivateFieldGet(this, _Position_position, "f").file] - letterRef[__classPrivateFieldGet(otherPosition, _Position_position, "f").file];
        const rankDiff = __classPrivateFieldGet(this, _Position_position, "f").rank - __classPrivateFieldGet(otherPosition, _Position_position, "f").rank;
        return { file: fileDiff, rank: rankDiff };
    }
    get position() {
        return { file: __classPrivateFieldGet(this, _Position_position, "f").file, rank: __classPrivateFieldGet(this, _Position_position, "f").rank };
    }
    set position({ file, rank }) {
        __classPrivateFieldSet(this, _Position_position, { file, rank }, "f");
    }
}
exports.Position = Position;
_Position_position = new WeakMap();
class Piece {
    constructor(pieceColour, file, rank) {
        _Piece_colour.set(this, void 0);
        _Piece_isCaptured.set(this, void 0);
        this.position = new Position(file, rank);
        __classPrivateFieldSet(this, _Piece_colour, pieceColour, "f");
        __classPrivateFieldSet(this, _Piece_isCaptured, false, "f");
    }
    set isCaptured(isCaptured) {
        __classPrivateFieldSet(this, _Piece_isCaptured, isCaptured, "f");
    }
    get isCaptured() {
        return __classPrivateFieldGet(this, _Piece_isCaptured, "f");
    }
    get colour() {
        return __classPrivateFieldGet(this, _Piece_colour, "f");
    }
}
exports.Piece = Piece;
_Piece_colour = new WeakMap(), _Piece_isCaptured = new WeakMap();
