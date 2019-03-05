import parse, {
  tokeniser,
  parseGridString,
  parseRobotOrientation,
  parseRobotInstructions,
  parseRobotLines,
} from "./parser";
import { Direction, Instruction } from "../Input";

describe(`tokeniser`, () => {
  const inputString = `5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`;

  const expectedTokeniserOutput = [
    `5 3`,
    `1 1 E`,
    `RFRFRFRF`,
    `3 2 N`,
    `FRRFLLFFRRFLL`,
    `0 3 W`,
    `LLFFFLFLFL`,
  ];

  it(`should split string into lines, removing empty lines`, () => {
    expect(tokeniser(inputString)).toEqual(expectedTokeniserOutput);
  });
});

describe(`parseGridString`, () => {
  it(`should parse valid inputs correctly`, () => {
    expect(parseGridString(`5 3`)).toEqual([5, 3]);
  });

  it(`should throw an error for invalid inputs`, () => {
    expect(() => parseGridString("hello")).toThrow(
      new Error(`Parse error: "hello" is not a valid grid string.`)
    );
  });
});

describe(`parseRobotOrientation`, () => {
  it(`should parse valid inputs correctly`, () => {
    expect(parseRobotOrientation(`2 1 E`)).toEqual({
      position: [2, 1],
      direction: Direction.E,
    });
  });

  it(`should throw an error for invalid inputs`, () => {
    expect(() => parseRobotOrientation("hello")).toThrow(
      new Error(`Parse error: "hello" is not a valid orientation string.`)
    );
  });
});

describe(`parseRobotInstructions`, () => {
  it(`should parse valid instructions correctly`, () => {
    expect(parseRobotInstructions(`FRRFLLFFRRFLL`)).toEqual([
      Instruction.F,
      Instruction.R,
      Instruction.R,
      Instruction.F,
      Instruction.L,
      Instruction.L,
      Instruction.F,
      Instruction.F,
      Instruction.R,
      Instruction.R,
      Instruction.F,
      Instruction.L,
      Instruction.L,
    ]);
  });

  it(`should throw an error for invalid instructions`, () => {
    expect(() => parseRobotInstructions("FRRFLAFFRRFLL")).toThrow(
      new Error(`Parse error: "A" is not a valid instruction.`)
    );
  });
});

describe(`parseRobotLines`, () => {
  const validInput = [`1 1 E`, `RFR`, `3 2 N`, `FLR`];

  const validOutput = [
    {
      position: [1, 1],
      direction: Direction.E,
      instructions: [Instruction.R, Instruction.F, Instruction.R],
    },
    {
      position: [3, 2],
      direction: Direction.N,
      instructions: [Instruction.F, Instruction.L, Instruction.R],
    },
  ];

  it(`should parse valid input correctly`, () => {
    expect(parseRobotLines(validInput)).toEqual(validOutput);
  });

  it(`should throw an error when input ends early`, () => {
    const invalidInput = [`1 1 E`, `RFR`, `3 2 N`];
    expect(() => parseRobotLines(invalidInput)).toThrow(
      new Error(`Unexpected end of input.`)
    );
  });
});

describe(`parser`, () => {
  it(`should parse valid input correctly`, () => {
    const inputString = `5 3
1 1 E
RFR

3 2 N
FLR`;
    const expectedOutput = {
      grid: [5, 3],
      robots: [
        {
          position: [1, 1],
          direction: Direction.E,
          instructions: [Instruction.R, Instruction.F, Instruction.R],
        },
        {
          position: [3, 2],
          direction: Direction.N,
          instructions: [Instruction.F, Instruction.L, Instruction.R],
        },
      ],
    };

    expect(parse(inputString)).toEqual(expectedOutput);
  });
});
