import { Direction, Instruction, Robot } from "./Input";
import { moveRobot, isPositionOffGrid, step, runInput, Mars } from "./index";

describe(`moveRobot`, () => {
  it(`should turn the robot successfully`, () => {
    const inputRobot: Robot = {
      position: [1, 1],
      direction: Direction.E,
      instructions: [Instruction.R, Instruction.F, Instruction.R],
    };

    const outputRobot: Robot = {
      position: [1, 1],
      direction: Direction.S,
      instructions: [Instruction.F, Instruction.R],
    };

    expect(moveRobot(inputRobot, [], [5, 5])).toEqual(outputRobot);
  });

  it(`should move the robot forward correctly`, () => {
    expect(
      moveRobot(
        {
          position: [1, 1],
          direction: Direction.N,
          instructions: [Instruction.F, Instruction.R],
        },
        [],
        [5, 5]
      )
    ).toEqual({
      position: [1, 2],
      direction: Direction.N,
      instructions: [Instruction.R],
    });

    expect(
      moveRobot(
        {
          position: [1, 1],
          direction: Direction.E,
          instructions: [Instruction.F, Instruction.R],
        },
        [],
        [5, 5]
      )
    ).toEqual({
      position: [2, 1],
      direction: Direction.E,
      instructions: [Instruction.R],
    });

    expect(
      moveRobot(
        {
          position: [1, 1],
          direction: Direction.S,
          instructions: [Instruction.F, Instruction.R],
        },
        [],
        [5, 5]
      )
    ).toEqual({
      position: [1, 0],
      direction: Direction.S,
      instructions: [Instruction.R],
    });

    expect(
      moveRobot(
        {
          position: [1, 1],
          direction: Direction.W,
          instructions: [Instruction.F, Instruction.R],
        },
        [],
        [5, 5]
      )
    ).toEqual({
      position: [0, 1],
      direction: Direction.W,
      instructions: [Instruction.R],
    });
  });

  it(`should refuse to move the robot off grid from a scented square`, () => {
    expect(
      moveRobot(
        {
          position: [5, 5],
          direction: Direction.N,
          instructions: [Instruction.F, Instruction.R],
        },
        [[5, 5]],
        [5, 5]
      )
    ).toEqual({
      position: [5, 5],
      direction: Direction.N,
      instructions: [Instruction.R],
    });
  });
});

describe(`isRobotDead`, () => {
  it(`should return false for a live robot`, () => {
    expect(
      isPositionOffGrid([3, 4], [3, 4])
    ).toEqual(false);
  });

  it(`should return true for a dead robot`, () => {
    expect(isPositionOffGrid([3, 4], [3, 5])).toEqual(true);

    expect(isPositionOffGrid([3, 4], [4, 4])).toEqual(true);

    expect(isPositionOffGrid([3, 4], [0, -1])).toEqual(true);

    expect(isPositionOffGrid([3, 4], [-1, 0])).toEqual(true);
  });
});

describe(`step`, () => {
  it(`should move robot uneventfully`, () => {
    const inputMars: Mars = {
      grid: [3, 4],
      robots: [
        {
          position: [0, 0],
          direction: Direction.N,
          instructions: [Instruction.F, Instruction.R],
        },
      ],
      scents: [],
      outcomes: [],
    };
    const outputMars: Mars = {
      grid: [3, 4],
      robots: [
        {
          position: [0, 1],
          direction: Direction.N,
          instructions: [Instruction.R],
        },
      ],
      scents: [],
      outcomes: [],
    };
    expect(step(inputMars)).toEqual(outputMars);
  });

  it(`should handle robot loss`, () => {
    const inputMars: Mars = {
      grid: [3, 4],
      robots: [
        {
          position: [0, 0],
          direction: Direction.W,
          instructions: [Instruction.F, Instruction.R],
        },
      ],
      scents: [],
      outcomes: [],
    };
    const outputMars: Mars = {
      grid: [3, 4],
      robots: [],
      scents: [[0, 0]],
      outcomes: [
        {
          position: [0, 0],
          direction: Direction.W,
          lost: true,
        },
      ],
    };
    expect(step(inputMars)).toEqual(outputMars);
  });

  it(`should handle robot running out of instructions`, () => {
    const inputMars: Mars = {
      grid: [3, 4],
      robots: [
        {
          position: [0, 0],
          direction: Direction.W,
          instructions: [Instruction.R],
        },
      ],
      scents: [],
      outcomes: [],
    };
    const outputMars: Mars = {
      grid: [3, 4],
      robots: [],
      scents: [],
      outcomes: [
        {
          position: [0, 0],
          direction: Direction.N,
          lost: false,
        },
      ],
    };

    expect(step(inputMars)).toEqual(outputMars);
  });
});

describe(`runInput`, () => {
  const inputMars: Mars = {
    grid: [5, 3],
    robots: [
      {
        position: [1, 1],
        direction: Direction.E,
        instructions: [
          Instruction.R,
          Instruction.F,
          Instruction.R,
          Instruction.F,
          Instruction.R,
          Instruction.F,
          Instruction.R,
          Instruction.F,
        ],
      },
      {
        position: [3, 2],
        direction: Direction.N,
        instructions: [
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
        ],
      },
      {
        position: [0, 3],
        direction: Direction.W,
        instructions: [
          Instruction.L,
          Instruction.L,
          Instruction.F,
          Instruction.F,
          Instruction.F,
          Instruction.L,
          Instruction.F,
          Instruction.L,
          Instruction.F,
          Instruction.L,
        ],
      },
    ],
    scents: [],
    outcomes: [],
  };
  const output = [
    {
      position: [1, 1],
      direction: Direction.E,
      lost: false,
    },
    {
      position: [3, 3],
      direction: Direction.N,
      lost: true,
    },
    {
      position: [2, 3],
      direction: Direction.S,
      lost: false,
    },
  ];

  expect(runInput(inputMars)).toEqual(output);
})
