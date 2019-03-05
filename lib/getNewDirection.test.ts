import { Direction, Instruction } from "../Input";
import getNewDirection from "./getNewDirection";

describe(`get new direction`, () => {
  it(`should update directions correctly`, () => {
    expect(getNewDirection(Direction.N, Instruction.L)).toEqual(Direction.W);
    expect(getNewDirection(Direction.N, Instruction.F)).toEqual(Direction.N);
    expect(getNewDirection(Direction.N, Instruction.R)).toEqual(Direction.E);

    expect(getNewDirection(Direction.E, Instruction.L)).toEqual(Direction.N);
    expect(getNewDirection(Direction.E, Instruction.F)).toEqual(Direction.E);
    expect(getNewDirection(Direction.E, Instruction.R)).toEqual(Direction.S);

    expect(getNewDirection(Direction.S, Instruction.L)).toEqual(Direction.E);
    expect(getNewDirection(Direction.S, Instruction.F)).toEqual(Direction.S);
    expect(getNewDirection(Direction.S, Instruction.R)).toEqual(Direction.W);

    expect(getNewDirection(Direction.W, Instruction.L)).toEqual(Direction.S);
    expect(getNewDirection(Direction.W, Instruction.F)).toEqual(Direction.W);
    expect(getNewDirection(Direction.W, Instruction.R)).toEqual(Direction.N);
  });
});
