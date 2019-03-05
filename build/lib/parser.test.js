"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = __importStar(require("./parser"));
var Input_1 = require("../Input");
describe("tokeniser", function () {
    var inputString = "5 3\n1 1 E\nRFRFRFRF\n\n3 2 N\nFRRFLLFFRRFLL\n\n0 3 W\nLLFFFLFLFL";
    var expectedTokeniserOutput = [
        "5 3",
        "1 1 E",
        "RFRFRFRF",
        "3 2 N",
        "FRRFLLFFRRFLL",
        "0 3 W",
        "LLFFFLFLFL",
    ];
    it("should split string into lines, removing empty lines", function () {
        expect(parser_1.tokeniser(inputString)).toEqual(expectedTokeniserOutput);
    });
});
describe("parseGridString", function () {
    it("should parse valid inputs correctly", function () {
        expect(parser_1.parseGridString("5 3")).toEqual([5, 3]);
    });
    it("should throw an error for invalid inputs", function () {
        expect(function () { return parser_1.parseGridString("hello"); }).toThrow(new Error("Parse error: \"hello\" is not a valid grid string."));
    });
});
describe("parseRobotOrientation", function () {
    it("should parse valid inputs correctly", function () {
        expect(parser_1.parseRobotOrientation("2 1 E")).toEqual({
            position: [2, 1],
            direction: Input_1.Direction.E,
        });
    });
    it("should throw an error for invalid inputs", function () {
        expect(function () { return parser_1.parseRobotOrientation("hello"); }).toThrow(new Error("Parse error: \"hello\" is not a valid orientation string."));
    });
});
describe("parseRobotInstructions", function () {
    it("should parse valid instructions correctly", function () {
        expect(parser_1.parseRobotInstructions("FRRFLLFFRRFLL")).toEqual([
            Input_1.Instruction.F,
            Input_1.Instruction.R,
            Input_1.Instruction.R,
            Input_1.Instruction.F,
            Input_1.Instruction.L,
            Input_1.Instruction.L,
            Input_1.Instruction.F,
            Input_1.Instruction.F,
            Input_1.Instruction.R,
            Input_1.Instruction.R,
            Input_1.Instruction.F,
            Input_1.Instruction.L,
            Input_1.Instruction.L,
        ]);
    });
    it("should throw an error for invalid instructions", function () {
        expect(function () { return parser_1.parseRobotInstructions("FRRFLAFFRRFLL"); }).toThrow(new Error("Parse error: \"A\" is not a valid instruction."));
    });
});
describe("parseRobotLines", function () {
    var validInput = ["1 1 E", "RFR", "3 2 N", "FLR"];
    var validOutput = [
        {
            position: [1, 1],
            direction: Input_1.Direction.E,
            instructions: [Input_1.Instruction.R, Input_1.Instruction.F, Input_1.Instruction.R],
        },
        {
            position: [3, 2],
            direction: Input_1.Direction.N,
            instructions: [Input_1.Instruction.F, Input_1.Instruction.L, Input_1.Instruction.R],
        },
    ];
    it("should parse valid input correctly", function () {
        expect(parser_1.parseRobotLines(validInput)).toEqual(validOutput);
    });
    it("should throw an error when input ends early", function () {
        var invalidInput = ["1 1 E", "RFR", "3 2 N"];
        expect(function () { return parser_1.parseRobotLines(invalidInput); }).toThrow(new Error("Unexpected end of input."));
    });
});
describe("parser", function () {
    it("should parse valid input correctly", function () {
        var inputString = "5 3\n1 1 E\nRFR\n\n3 2 N\nFLR";
        var expectedOutput = {
            grid: [5, 3],
            robots: [
                {
                    position: [1, 1],
                    direction: Input_1.Direction.E,
                    instructions: [Input_1.Instruction.R, Input_1.Instruction.F, Input_1.Instruction.R],
                },
                {
                    position: [3, 2],
                    direction: Input_1.Direction.N,
                    instructions: [Input_1.Instruction.F, Input_1.Instruction.L, Input_1.Instruction.R],
                },
            ],
        };
        expect(parser_1.default(inputString)).toEqual(expectedOutput);
    });
});
