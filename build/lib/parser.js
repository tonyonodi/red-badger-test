"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Input_1 = require("../Input");
exports.tokeniser = function (string) {
    return string.split(/\n+/);
};
exports.parseGridString = function (gridString) {
    var match = /^\s*(\d+)\s+(\d+)\s*$/.exec(gridString);
    if (!match) {
        throw new Error("Parse error: \"" + gridString + "\" is not a valid grid string.");
    }
    return [parseInt(match[1]), parseInt(match[2])];
};
var instructionsDict = {
    F: Input_1.Instruction.F,
    L: Input_1.Instruction.L,
    R: Input_1.Instruction.R,
};
exports.parseRobotInstructions = function (instructionsString) {
    var instructionChars = instructionsString.split(/s*/);
    var instructions = instructionChars.map(function (char) {
        var instruction = instructionsDict[char];
        if (instruction === undefined) {
            throw new Error("Parse error: \"" + char + "\" is not a valid instruction.");
        }
        return instruction;
    });
    return instructions;
};
var directionsDict = {
    N: Input_1.Direction.N,
    S: Input_1.Direction.S,
    E: Input_1.Direction.E,
    W: Input_1.Direction.W,
};
exports.parseRobotOrientation = function (orientationString) {
    var match = /^\s*(\d+)\s+(\d+)\s+([NSEW])\s*$/.exec(orientationString);
    if (!match) {
        throw new Error("Parse error: \"" + orientationString + "\" is not a valid orientation string.");
    }
    var _ = match[0], x = match[1], y = match[2], dir = match[3];
    return {
        position: [parseInt(x), parseInt(y)],
        direction: directionsDict[dir],
    };
};
exports.parseRobotLines = function (lines, robots) {
    if (robots === void 0) { robots = []; }
    if (lines.length === 0)
        return robots;
    var orientationString = lines[0], instructionsString = lines[1], remainingLines = lines.slice(2);
    if (!instructionsString)
        throw new Error("Unexpected end of input.");
    var _a = exports.parseRobotOrientation(orientationString), position = _a.position, direction = _a.direction;
    var instructions = exports.parseRobotInstructions(instructionsString);
    var robot = {
        position: position,
        direction: direction,
        instructions: instructions,
    };
    return exports.parseRobotLines(remainingLines, robots.concat([robot]));
};
exports.default = (function (inputString) {
    // Because this grammar is very simple we can tokenise by line.
    var _a = exports.tokeniser(inputString), gridString = _a[0], robotLines = _a.slice(1);
    var grid = exports.parseGridString(gridString);
    var robots = exports.parseRobotLines(robotLines);
    return {
        grid: grid,
        robots: robots,
    };
});
