"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var directionStrings = ["N", "E", "S", "W"];
exports.default = (function (output) {
    return output
        .map(function (_a) {
        var position = _a.position, direction = _a.direction, lost = _a.lost;
        var directionString = directionStrings[direction];
        var lostString = lost ? " LOST" : "";
        return position[0] + " " + position[1] + " " + directionString + lostString;
    })
        .join("\n\n");
});
