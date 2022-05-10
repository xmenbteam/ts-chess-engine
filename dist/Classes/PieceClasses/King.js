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
var _King_hasMoved;
Object.defineProperty(exports, "__esModule", { value: true });
exports.King = void 0;
const PiecesAndPosition_1 = require("./PiecesAndPosition");
class King extends PiecesAndPosition_1.Piece {
    constructor(pieceColour, file, rank) {
        super(pieceColour, file, rank);
        _King_hasMoved.set(this, void 0);
        __classPrivateFieldSet(this, _King_hasMoved, false, "f");
    }
    get hasMoved() {
        return __classPrivateFieldGet(this, _King_hasMoved, "f");
    }
    set hasMoved(hasMoved) {
        __classPrivateFieldSet(this, _King_hasMoved, hasMoved, "f");
    }
    canMoveTo(newPosition) {
        const { rank, file } = newPosition.distanceFrom(this.position);
        if ((Math.abs(file) === 1 && Math.abs(rank) === 1) ||
            (Math.abs(file) === 1 && !rank) ||
            (!file && Math.abs(rank) === 1))
            return true;
        return false;
    }
    moveTo(file, rank) {
        this.position.position = { file, rank };
        this.hasMoved = true;
    }
}
exports.King = King;
_King_hasMoved = new WeakMap();
