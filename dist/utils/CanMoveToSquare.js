"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanMoveToSquare = void 0;
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
