"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Input_1 = require("../Input");
var outputToString_1 = __importDefault(require("./outputToString"));
// position: [number, number];
// direction: Direction;
// lost: boolean;
describe("output to string", function () {
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
    var outputString = "1 1 E\n\n3 3 N LOST\n\n2 3 S";
    it("should convert output to a string correctly", function () {
        expect(outputToString_1.default(output)).toEqual(outputString);
    });
});
