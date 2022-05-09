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
var _Rook_hasMoved;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rook = void 0;
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class Rook extends PiecesAndPosition_1.Piece {
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
        _Rook_hasMoved.set(this, void 0);
        __classPrivateFieldSet(this, _Rook_hasMoved, false, "f");
    }
    get hasMoved() {
        return __classPrivateFieldGet(this, _Rook_hasMoved, "f");
    }
    set hasMoved(hasMoved) {
        __classPrivateFieldSet(this, _Rook_hasMoved, hasMoved, "f");
    }
    canMoveTo(newPosition) {
        const { file, rank } = newPosition.distanceFrom(this.position);
        if (!file || !rank)
            return true;
        return false;
    }
    moveTo(file, rank) {
        this.position.position = { file, rank };
        this.hasMoved = true;
    }
}
exports.Rook = Rook;
_Rook_hasMoved = new WeakMap();
