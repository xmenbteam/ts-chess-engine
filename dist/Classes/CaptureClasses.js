"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Capture = void 0;
class Capture {
    constructor(capturingPiece, targetPiece, positions) {
        this.capturingPiece = capturingPiece;
        this.targetPiece = targetPiece;
        this.positions = positions;
    }
    isPieceSameColour() {
        const p1Colour = this.capturingPiece.getColour();
        const p2Colour = this.targetPiece.getColour();
        return p1Colour === p2Colour ? true : false;
    }
    canCapture() {
        const { file: targetFile, rank: targetRank } = this.targetPiece.position.getPosition();
        const notYou = this.positions.filter((pos) => pos !== `${targetFile}${targetRank}`);
        const canMove = this.capturingPiece.canMoveTo(this.targetPiece.position, notYou);
        const isSameColour = this.isPieceSameColour();
        if (canMove && !isSameColour)
            return true;
        return false;
    }
    canPawnCapture() {
        const { file, rank } = this.targetPiece.position.distanceFrom(this.capturingPiece.position);
        const canCapture = file === 1 && Math.abs(rank) === 1;
        if (canCapture && !this.isPieceSameColour())
            return true;
        return false;
    }
    enPassant() { }
}
exports.Capture = Capture;
