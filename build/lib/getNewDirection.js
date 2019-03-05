"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (direction, instruction) {
    var d = direction + instruction;
    return ((d % 4) + 4) % 4;
});
