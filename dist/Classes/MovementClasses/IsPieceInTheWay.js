"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPieceInTheWay = void 0;
const utils_1 = require("../../utils/utils");
class IsPieceInTheWay {
    constructor(piecePos, destiPos, allPieces) {
        this.isInWay = false;
        this.piecePos = piecePos;
        this.destiPos = destiPos;
        this.allPieces = allPieces;
    }
    checkRankAndFile() {
        const { file: destiFileDist, rank: destiRankDist } = this.destiPos.distanceFrom(this.piecePos);
        for (let piece in this.allPieces) {
            const { file: pieceFileDist, rank: pieceRankDist } = this.allPieces[piece].position.distanceFrom(this.piecePos);
            const dirFromPiece = new utils_1.utils().rankAndFileDirRef(pieceFileDist, pieceRankDist);
            if (dirFromPiece === "N")
                if (pieceRankDist < destiRankDist)
                    this.isInWay = true;
            if (dirFromPiece === "S")
                if (pieceRankDist > destiRankDist)
                    this.isInWay = true;
            if (dirFromPiece === "E")
                if (pieceFileDist < destiFileDist)
                    this.isInWay = true;
            if (dirFromPiece === "W")
                if (pieceFileDist > destiFileDist)
                    this.isInWay = true;
        }
        return this.isInWay;
    }
    setIsInWay(i, j, ignoreYourself) {
        const { files } = new utils_1.utils().getLetterRefs();
        const square = `${files[i]}${j}`;
        if (ignoreYourself.includes(square))
            this.isInWay = true;
    }
    checkDiagonal() {
        const { file: destiFileDist, rank: destiRankDist } = this.destiPos.distanceFrom(this.piecePos);
        for (let piece in this.allPieces) {
            const { file: pieceFileDist, rank: pieceRankDist } = this.allPieces[piece].position.distanceFrom(this.piecePos);
            const dirFromPiece = new utils_1.utils().diagonalDirRef(pieceFileDist, pieceRankDist);
            if (dirFromPiece === "NE" || dirFromPiece === "SE")
                if (pieceRankDist < destiRankDist)
                    this.isInWay = true;
            if (dirFromPiece === "NW" || dirFromPiece === "SW")
                if (pieceRankDist > destiRankDist)
                    this.isInWay = true;
        }
        return this.isInWay;
    }
    checkBoth() {
        const { file: destiFileDist, rank: destiRankDist } = this.destiPos.distanceFrom(this.piecePos);
        if (!destiFileDist || !destiRankDist)
            return this.checkRankAndFile();
        if (Math.abs(destiFileDist) === Math.abs(destiRankDist))
            return this.checkDiagonal();
    }
    checkKingMove() {
        for (let piece in this.allPieces) {
            const { file: fileDistance, rank: rankDistance } = this.allPieces[piece].position.distanceFrom(this.piecePos);
            if ((Math.abs(rankDistance) === 1 && !fileDistance) ||
                (!rankDistance && Math.abs(fileDistance) === 1) ||
                (Math.abs(fileDistance) === 1 && Math.abs(rankDistance) === 1))
                this.isInWay = true;
        }
        return this.isInWay;
    }
}
exports.IsPieceInTheWay = IsPieceInTheWay;
