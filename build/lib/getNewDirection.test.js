"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Input_1 = require("../Input");
var getNewDirection_1 = __importDefault(require("./getNewDirection"));
describe("get new direction", function () {
    it("should update directions correctly", function () {
        expect(getNewDirection_1.default(Input_1.Direction.N, Input_1.Instruction.L)).toEqual(Input_1.Direction.W);
        expect(getNewDirection_1.default(Input_1.Direction.N, Input_1.Instruction.F)).toEqual(Input_1.Direction.N);
        expect(getNewDirection_1.default(Input_1.Direction.N, Input_1.Instruction.R)).toEqual(Input_1.Direction.E);
        expect(getNewDirection_1.default(Input_1.Direction.E, Input_1.Instruction.L)).toEqual(Input_1.Direction.N);
        expect(getNewDirection_1.default(Input_1.Direction.E, Input_1.Instruction.F)).toEqual(Input_1.Direction.E);
        expect(getNewDirection_1.default(Input_1.Direction.E, Input_1.Instruction.R)).toEqual(Input_1.Direction.S);
        expect(getNewDirection_1.default(Input_1.Direction.S, Input_1.Instruction.L)).toEqual(Input_1.Direction.E);
        expect(getNewDirection_1.default(Input_1.Direction.S, Input_1.Instruction.F)).toEqual(Input_1.Direction.S);
        expect(getNewDirection_1.default(Input_1.Direction.S, Input_1.Instruction.R)).toEqual(Input_1.Direction.W);
        expect(getNewDirection_1.default(Input_1.Direction.W, Input_1.Instruction.L)).toEqual(Input_1.Direction.S);
        expect(getNewDirection_1.default(Input_1.Direction.W, Input_1.Instruction.F)).toEqual(Input_1.Direction.W);
        expect(getNewDirection_1.default(Input_1.Direction.W, Input_1.Instruction.R)).toEqual(Input_1.Direction.N);
    });
});
