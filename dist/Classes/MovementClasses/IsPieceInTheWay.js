"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPieceInTheWay = void 0;
const utils_1 = require("../../utils/utils");
class IsPieceInTheWay {
    static checkRankAndFile(piecePos, destiPos, allPieces) {
        let isInWay = false;
        const { checkDirection } = utils_1.utils;
        const { file: destiFileDist, rank: destiRankDist } = destiPos.distanceFrom(piecePos);
        for (let piece in allPieces) {
            const { file: pieceFileDist, rank: pieceRankDist } = allPieces[piece].position.distanceFrom(piecePos);
            const dirFromPiece = checkDirection(pieceFileDist, pieceRankDist);
            if (dirFromPiece === "N" && pieceRankDist < destiRankDist)
                isInWay = true;
            if (dirFromPiece === "S" && pieceRankDist > destiRankDist)
                isInWay = true;
            if (dirFromPiece === "E" && pieceFileDist < destiFileDist)
                isInWay = true;
            if (dirFromPiece === "W" && pieceFileDist > destiFileDist)
                isInWay = true;
        }
        return isInWay;
    }
    static checkDiagonal(piecePos, destiPos, allPieces) {
        let isInWay = false;
        const { checkDirection } = utils_1.utils;
        const { file: destiFileDist, rank: destiRankDist } = destiPos.distanceFrom(piecePos);
        for (let piece in allPieces) {
            const { file: pieceFileDist, rank: pieceRankDist } = allPieces[piece].position.distanceFrom(piecePos);
            const dirFromPiece = checkDirection(pieceFileDist, pieceRankDist);
            if (dirFromPiece === "NE" &&
                Math.abs(pieceFileDist) === Math.abs(pieceRankDist) &&
                pieceRankDist < destiRankDist &&
                pieceFileDist < destiFileDist)
                isInWay = true;
            if (dirFromPiece === "SW" &&
                Math.abs(pieceFileDist) === Math.abs(pieceRankDist) &&
                pieceFileDist === pieceRankDist &&
                pieceRankDist > destiRankDist &&
                pieceFileDist > destiFileDist)
                isInWay = true;
            if (dirFromPiece === "SE" &&
                Math.abs(pieceFileDist) === Math.abs(pieceRankDist) &&
                pieceRankDist > destiRankDist &&
                pieceFileDist < destiFileDist)
                isInWay = true;
            if (dirFromPiece === "NW" &&
                Math.abs(pieceFileDist) === Math.abs(pieceRankDist) &&
                pieceRankDist < destiRankDist &&
                pieceFileDist > destiFileDist)
                isInWay = true;
        }
        return isInWay;
    }
    static checkBoth(piecePos, destiPos, allPieces) {
        const { file: destiFileDist, rank: destiRankDist } = destiPos.distanceFrom(piecePos);
        if (!destiFileDist || !destiRankDist)
            return IsPieceInTheWay.checkRankAndFile(piecePos, destiPos, allPieces);
        if (Math.abs(destiFileDist) === Math.abs(destiRankDist))
            return IsPieceInTheWay.checkDiagonal(piecePos, destiPos, allPieces);
        else
            return false;
    }
}
exports.IsPieceInTheWay = IsPieceInTheWay;
