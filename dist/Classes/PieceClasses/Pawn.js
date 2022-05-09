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
var _Pawn_hasMoved, _Pawn_moveCount;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = void 0;
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class Pawn extends PiecesAndPosition_1.Piece {
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
        _Pawn_hasMoved.set(this, void 0);
        _Pawn_moveCount.set(this, void 0);
        __classPrivateFieldSet(this, _Pawn_hasMoved, false, "f");
        __classPrivateFieldSet(this, _Pawn_moveCount, 0, "f");
    }
    get hasMoved() {
        return __classPrivateFieldGet(this, _Pawn_hasMoved, "f");
    }
    set hasMoved(hasMoved) {
        if (!this.hasMoved)
            __classPrivateFieldSet(this, _Pawn_hasMoved, hasMoved, "f");
    }
    get moveCount() {
        return __classPrivateFieldGet(this, _Pawn_moveCount, "f");
    }
    set moveCount(num) {
        __classPrivateFieldSet(this, _Pawn_moveCount, __classPrivateFieldGet(this, _Pawn_moveCount, "f") + num, "f");
    }
    canMoveTo(newPosition) {
        const { file, rank } = newPosition.distanceFrom(this.position);
        if ((!file && Math.abs(rank) === 1) ||
            (!file && Math.abs(rank) === 2 && !this.hasMoved))
            return true;
        return false;
    }
    moveTo(file, rank) {
        this.hasMoved = true;
        if (this.position.position.rank !== rank)
            this.moveCount = 1;
        this.position.position = { file, rank };
        return { hasMoved: this.hasMoved, moveCount: this.moveCount };
    }
}
exports.Pawn = Pawn;
_Pawn_hasMoved = new WeakMap(), _Pawn_moveCount = new WeakMap();
