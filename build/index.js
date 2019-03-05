"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var Input_1 = require("./Input");
var parser_1 = __importDefault(require("./lib/parser"));
var vector_1 = require("./lib/vector");
var getNewDirection_1 = __importDefault(require("./lib/getNewDirection"));
var outputToString_1 = __importDefault(require("./lib/outputToString"));
exports.isPositionOffGrid = function (grid, position) {
    return (position[0] < 0 ||
        position[1] < 0 ||
        position[0] > grid[0] ||
        position[1] > grid[1]);
};
var moveVectors = [[0, 1], [1, 0], [0, -1], [-1, 0]];
exports.moveRobot = function (robot, scents, grid) {
    var _a = robot.instructions, instruction = _a[0], instructions = _a.slice(1);
    var newDirection = getNewDirection_1.default(robot.direction, instruction);
    var moveVector = instruction === Input_1.Instruction.F ? moveVectors[robot.direction] : [0, 0];
    var currentPositionScented = Boolean(scents.find(function (scent) {
        return scent[0] === robot.position[0] && scent[1] === robot.position[1];
    }));
    var newPosition = vector_1.add(moveVector, robot.position);
    var newPositionOffGrid = exports.isPositionOffGrid(grid, newPosition);
    return {
        position: currentPositionScented && newPositionOffGrid
            ? robot.position
            : newPosition,
        direction: newDirection,
        instructions: instructions,
    };
};
exports.step = function (_a) {
    var grid = _a.grid, robots = _a.robots, scents = _a.scents, outcomes = _a.outcomes;
    var robot = robots[0], restRobots = robots.slice(1);
    var newRobot = exports.moveRobot(robot, scents, grid);
    var isDead = exports.isPositionOffGrid(grid, newRobot.position);
    if (isDead) {
        return {
            grid: grid,
            robots: restRobots,
            scents: scents.concat([robot.position]),
            outcomes: outcomes.concat([
                {
                    position: robot.position,
                    direction: robot.direction,
                    lost: true,
                },
            ]),
        };
    }
    if (newRobot.instructions.length === 0) {
        return {
            grid: grid,
            robots: restRobots,
            scents: scents,
            outcomes: outcomes.concat([
                {
                    position: newRobot.position,
                    direction: newRobot.direction,
                    lost: false,
                },
            ]),
        };
    }
    return {
        grid: grid,
        robots: [newRobot].concat(restRobots),
        scents: scents,
        outcomes: outcomes,
    };
};
exports.runInput = function (_a) {
    var grid = _a.grid, robots = _a.robots;
    var mars = { grid: grid, robots: robots, scents: [], outcomes: [] };
    while (mars.robots.length > 0) {
        mars = exports.step(mars);
    }
    return mars.outcomes;
};
var inputIndex = process.argv.findIndex(function (arg) {
    return /^--input=(.+)$/.test(arg);
});
var inputPath = inputIndex >= 0 ? process.argv[inputIndex].split("=")[1] : null;
if (inputPath) {
    var fullPath = path_1.default.join(__dirname, inputPath);
    var file = fs_1.readFileSync(fullPath, "utf8");
    var input = parser_1.default(file);
    var result = exports.runInput(input);
    // Print output
    console.log(outputToString_1.default(result));
}
