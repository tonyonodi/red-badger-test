"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Direction;
(function (Direction) {
    Direction[Direction["N"] = 0] = "N";
    Direction[Direction["E"] = 1] = "E";
    Direction[Direction["S"] = 2] = "S";
    Direction[Direction["W"] = 3] = "W";
})(Direction = exports.Direction || (exports.Direction = {}));
var Instruction;
(function (Instruction) {
    Instruction[Instruction["L"] = -1] = "L";
    Instruction[Instruction["F"] = 0] = "F";
    Instruction[Instruction["R"] = 1] = "R";
})(Instruction = exports.Instruction || (exports.Instruction = {}));
