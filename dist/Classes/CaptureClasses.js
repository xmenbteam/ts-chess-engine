"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Capture = void 0;
const utils_1 = require("../utils/utils");
class Capture {
    constructor(capturingPiece, targetPiece, positions) {
        this.capturingPiece = capturingPiece;
        this.targetPiece = targetPiece;
        this.positions = positions;
    }
    isPieceSameColour() {
        const p1Colour = this.capturingPiece.colour;
        const p2Colour = this.targetPiece.colour;
        return p1Colour === p2Colour ? true : false;
    }
    canCapture() {
        const { file: targetFile, rank: targetRank } = this.targetPiece.position.position;
        const notYou = this.positions.filter((pos) => pos !== `${targetFile}${targetRank}`);
        const canMove = this.capturingPiece.canMoveTo(this.targetPiece.position);
        const isSameColour = this.isPieceSameColour();
        if (canMove && !isSameColour)
            return true;
        return false;
    }
    canPawnCapture() {
        const { file, rank } = this.targetPiece.position.distanceFrom(this.capturingPiece.position);
        const isPawn = this.capturingPiece.constructor.name === "Pawn";
        const canCapture = file === 1 && Math.abs(rank) === 1;
        if (isPawn && canCapture && !this.isPieceSameColour())
            return true;
        return false;
    }
    canEnPassant() {
        const { letterRef } = new utils_1.utils().getLetterRefs();
        const arePawns = this.capturingPiece.constructor.name === "Pawn" &&
            this.targetPiece.constructor.name === "Pawn";
        const { file: capFile, rank: capRank } = this.capturingPiece.position.position;
        const { file: targFile, rank: targRank } = this.targetPiece.position.position;
        const capCount = this.capturingPiece.moveCount;
        const targCount = this.targetPiece.moveCount;
        const maxFile = Math.max(letterRef[capFile], letterRef[targFile]);
        const minFile = Math.min(letterRef[capFile], letterRef[targFile]);
        const isParallel = capRank === targRank;
        const rightMoves = (capCount === 2 || capCount === 3) && targCount === 1;
        const areNextToEachOther = maxFile - minFile === 1;
        if (arePawns && isParallel && rightMoves && areNextToEachOther)
            return true;
        return false;
    }
}
exports.Capture = Capture;
