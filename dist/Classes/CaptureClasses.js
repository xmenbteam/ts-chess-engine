"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Capture = void 0;
const utils_1 = require("../utils/utils");
class Capture {
    isPieceSameColour(capturingPiece, targetPiece) {
        const p1Colour = capturingPiece.colour;
        const p2Colour = targetPiece.colour;
        return p1Colour === p2Colour ? true : false;
    }
    canCapture(capturingPiece, targetPiece) {
        const canMove = capturingPiece.canMoveTo(targetPiece.position);
        const isSameColour = this.isPieceSameColour(capturingPiece, targetPiece);
        if (canMove && !isSameColour)
            return true;
        return false;
    }
    canPawnCapture(capturingPiece, targetPiece) {
        const { file, rank } = targetPiece.position.distanceFrom(capturingPiece.position);
        const isPawn = capturingPiece.constructor.name === "Pawn";
        const canCapture = file === 1 && Math.abs(rank) === 1;
        if (isPawn &&
            canCapture &&
            !this.isPieceSameColour(capturingPiece, targetPiece))
            return true;
        return false;
    }
    canEnPassant(capturingPiece, targetPiece) {
        var _a, _b;
        const { letterRef } = utils_1.utils.getLetterRefs();
        const arePawns = capturingPiece.constructor.name === "Pawn" &&
            targetPiece.constructor.name === "Pawn";
        const { file: capFile, rank: capRank } = capturingPiece.position.position;
        const { file: targFile, rank: targRank } = targetPiece.position.position;
        const capCount = (_a = capturingPiece.moveTo(capFile, capRank)) === null || _a === void 0 ? void 0 : _a.moveCount;
        const targCount = (_b = targetPiece.moveTo(targFile, targRank)) === null || _b === void 0 ? void 0 : _b.moveCount;
        const isParallel = capRank === targRank;
        const rightMoves = capCount && capCount <= 3 && targCount === 1;
        const areNextToEachOther = Math.abs(letterRef[capFile] - letterRef[targFile]) === 1;
        if (arePawns && isParallel && rightMoves && areNextToEachOther)
            return true;
        return false;
    }
}
exports.Capture = Capture;
