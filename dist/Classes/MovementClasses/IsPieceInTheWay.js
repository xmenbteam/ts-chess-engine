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
            const { file: fileDistance, rank: rankDistance } = this.allPieces[piece].position.distanceFrom(this.piecePos);
            if (fileDistance === 0 &&
                Math.abs(rankDistance) > 0 &&
                Math.abs(rankDistance) < Math.abs(destiRankDist))
                this.isInWay = true;
            if (rankDistance === 0 &&
                Math.abs(fileDistance) > 0 &&
                Math.abs(fileDistance) < Math.abs(destiFileDist))
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
            const { file: fileDistance, rank: rankDistance } = this.allPieces[piece].position.distanceFrom(this.piecePos);
            if (Math.abs(rankDistance) > 0 &&
                Math.abs(fileDistance) > 0 &&
                Math.abs(rankDistance) === Math.abs(fileDistance) &&
                Math.abs(destiFileDist) === Math.abs(destiRankDist))
                this.isInWay = true;
        }
        return this.isInWay;
    }
    checkBoth() {
        // const { file, rank } = this.piecePos.position;
        // const { file: destiFile, rank: destiRank } = this.destiPos.position;
        // if (file === destiFile || rank === destiRank) this.checkRankAndFile();
        // else this.checkDiagonal();
        return this.isInWay;
    }
    checkKingMove() {
        // const { file: pieceFile, rank: pieceRank } = this.piecePos.position;
        // const ignoreYourself = this.positions.filter((p) => p !== this.pieceCoords);
        // const { letterRef, files } = new utils().getLetterRefs();
        // const wrongSquares = [
        //   `${files[letterRef[pieceFile] - 1]}${pieceRank}`,
        //   `${files[letterRef[pieceFile] - 1]}${pieceRank + 1}`,
        //   `${files[letterRef[pieceFile]]}${pieceRank + 1}`,
        //   `${files[letterRef[pieceFile] + 1]}${pieceRank + 1}`,
        //   `${files[letterRef[pieceFile] + 1]}${pieceRank}`,
        //   `${files[letterRef[pieceFile] + 1]}${pieceRank - 1}`,
        //   `${files[letterRef[pieceFile]]}${pieceRank - 1}`,
        //   `${files[letterRef[pieceFile] - 1]}${pieceRank - 1}`,
        // ];
        // wrongSquares.forEach((squ) => {
        //   if (ignoreYourself.includes(squ)) this.isInWay = true;
        // });
        return this.isInWay;
    }
}
exports.IsPieceInTheWay = IsPieceInTheWay;
