"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Input_1 = require("./Input");
var index_1 = require("./index");
describe("moveRobot", function () {
    it("should turn the robot successfully", function () {
        var inputRobot = {
            position: [1, 1],
            direction: Input_1.Direction.E,
            instructions: [Input_1.Instruction.R, Input_1.Instruction.F, Input_1.Instruction.R],
        };
        var outputRobot = {
            position: [1, 1],
            direction: Input_1.Direction.S,
            instructions: [Input_1.Instruction.F, Input_1.Instruction.R],
        };
        expect(index_1.moveRobot(inputRobot, [], [5, 5])).toEqual(outputRobot);
    });
    it("should move the robot forward correctly", function () {
        expect(index_1.moveRobot({
            position: [1, 1],
            direction: Input_1.Direction.N,
            instructions: [Input_1.Instruction.F, Input_1.Instruction.R],
        }, [], [5, 5])).toEqual({
            position: [1, 2],
            direction: Input_1.Direction.N,
            instructions: [Input_1.Instruction.R],
        });
        expect(index_1.moveRobot({
            position: [1, 1],
            direction: Input_1.Direction.E,
            instructions: [Input_1.Instruction.F, Input_1.Instruction.R],
        }, [], [5, 5])).toEqual({
            position: [2, 1],
            direction: Input_1.Direction.E,
            instructions: [Input_1.Instruction.R],
        });
        expect(index_1.moveRobot({
            position: [1, 1],
            direction: Input_1.Direction.S,
            instructions: [Input_1.Instruction.F, Input_1.Instruction.R],
        }, [], [5, 5])).toEqual({
            position: [1, 0],
            direction: Input_1.Direction.S,
            instructions: [Input_1.Instruction.R],
        });
        expect(index_1.moveRobot({
            position: [1, 1],
            direction: Input_1.Direction.W,
            instructions: [Input_1.Instruction.F, Input_1.Instruction.R],
        }, [], [5, 5])).toEqual({
            position: [0, 1],
            direction: Input_1.Direction.W,
            instructions: [Input_1.Instruction.R],
        });
    });
    it("should refuse to move the robot off grid from a scented square", function () {
        expect(index_1.moveRobot({
            position: [5, 5],
            direction: Input_1.Direction.N,
            instructions: [Input_1.Instruction.F, Input_1.Instruction.R],
        }, [[5, 5]], [5, 5])).toEqual({
            position: [5, 5],
            direction: Input_1.Direction.N,
            instructions: [Input_1.Instruction.R],
        });
    });
});
describe("isRobotDead", function () {
    it("should return false for a live robot", function () {
        expect(index_1.isPositionOffGrid([3, 4], [3, 4])).toEqual(false);
    });
    it("should return true for a dead robot", function () {
        expect(index_1.isPositionOffGrid([3, 4], [3, 5])).toEqual(true);
        expect(index_1.isPositionOffGrid([3, 4], [4, 4])).toEqual(true);
        expect(index_1.isPositionOffGrid([3, 4], [0, -1])).toEqual(true);
        expect(index_1.isPositionOffGrid([3, 4], [-1, 0])).toEqual(true);
    });
});
describe("step", function () {
    it("should move robot uneventfully", function () {
        var inputMars = {
            grid: [3, 4],
            robots: [
                {
                    position: [0, 0],
                    direction: Input_1.Direction.N,
                    instructions: [Input_1.Instruction.F, Input_1.Instruction.R],
                },
            ],
            scents: [],
            outcomes: [],
        };
        var outputMars = {
            grid: [3, 4],
            robots: [
                {
                    position: [0, 1],
                    direction: Input_1.Direction.N,
                    instructions: [Input_1.Instruction.R],
                },
            ],
            scents: [],
            outcomes: [],
        };
        expect(index_1.step(inputMars)).toEqual(outputMars);
    });
    it("should handle robot loss", function () {
        var inputMars = {
            grid: [3, 4],
            robots: [
                {
                    position: [0, 0],
                    direction: Input_1.Direction.W,
                    instructions: [Input_1.Instruction.F, Input_1.Instruction.R],
                },
            ],
            scents: [],
            outcomes: [],
        };
        var outputMars = {
            grid: [3, 4],
            robots: [],
            scents: [[0, 0]],
            outcomes: [
                {
                    position: [0, 0],
                    direction: Input_1.Direction.W,
                    lost: true,
                },
            ],
        };
        expect(index_1.step(inputMars)).toEqual(outputMars);
    });
    it("should handle robot running out of instructions", function () {
        var inputMars = {
            grid: [3, 4],
            robots: [
                {
                    position: [0, 0],
                    direction: Input_1.Direction.W,
                    instructions: [Input_1.Instruction.R],
                },
            ],
            scents: [],
            outcomes: [],
        };
        var outputMars = {
            grid: [3, 4],
            robots: [],
            scents: [],
            outcomes: [
                {
                    position: [0, 0],
                    direction: Input_1.Direction.N,
                    lost: false,
                },
            ],
        };
        expect(index_1.step(inputMars)).toEqual(outputMars);
    });
});
describe("runInput", function () {
    var inputMars = {
        grid: [5, 3],
        robots: [
            {
                position: [1, 1],
                direction: Input_1.Direction.E,
                instructions: [
                    Input_1.Instruction.R,
                    Input_1.Instruction.F,
                    Input_1.Instruction.R,
                    Input_1.Instruction.F,
                    Input_1.Instruction.R,
                    Input_1.Instruction.F,
                    Input_1.Instruction.R,
                    Input_1.Instruction.F,
                ],
            },
            {
                position: [3, 2],
                direction: Input_1.Direction.N,
                instructions: [
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
                ],
            },
            {
                position: [0, 3],
                direction: Input_1.Direction.W,
                instructions: [
                    Input_1.Instruction.L,
                    Input_1.Instruction.L,
                    Input_1.Instruction.F,
                    Input_1.Instruction.F,
                    Input_1.Instruction.F,
                    Input_1.Instruction.L,
                    Input_1.Instruction.F,
                    Input_1.Instruction.L,
                    Input_1.Instruction.F,
                    Input_1.Instruction.L,
                ],
            },
        ],
        scents: [],
        outcomes: [],
    };
    var output = [
        {
            position: [1, 1],
            direction: Input_1.Direction.E,
            lost: false,
        },
        {
            position: [3, 3],
            direction: Input_1.Direction.N,
            lost: true,
        },
        {
            position: [2, 3],
            direction: Input_1.Direction.S,
            lost: false,
        },
    ];
    expect(index_1.runInput(inputMars)).toEqual(output);
});
