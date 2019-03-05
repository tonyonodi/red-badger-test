import { readFileSync } from "fs";
import path from "path";
import { Input, Direction, Instruction, Robot } from "./Input";
import parse from "./lib/parser";
import { add } from "./lib/vector";
import getNewDirection from "./lib/getNewDirection";
import outputToString from "./lib/outputToString";

export interface Outcome {
  position: [number, number];
  direction: Direction;
  lost: boolean;
}

export interface Mars extends Input {
  scents: [number, number][];
  outcomes: Outcome[];
}

export const isPositionOffGrid = (
  grid: [number, number],
  position: [number, number]
): boolean => {
  return (
    position[0] < 0 ||
    position[1] < 0 ||
    position[0] > grid[0] ||
    position[1] > grid[1]
  );
};

const moveVectors: [number, number][] = [[0, 1], [1, 0], [0, -1], [-1, 0]];

export const moveRobot = (
  robot: Robot,
  scents: [number, number][],
  grid: [number, number]
): Robot => {
  const [instruction, ...instructions] = robot.instructions;
  const newDirection = getNewDirection(robot.direction, instruction);

  const moveVector: [number, number] =
    instruction === Instruction.F ? moveVectors[robot.direction] : [0, 0];

  const currentPositionScented = Boolean(
    scents.find(scent => {
      return scent[0] === robot.position[0] && scent[1] === robot.position[1];
    })
  );

  const newPosition = add(moveVector, robot.position);

  const newPositionOffGrid = isPositionOffGrid(grid, newPosition);

  return {
    position:
      currentPositionScented && newPositionOffGrid
        ? robot.position
        : newPosition,
    direction: newDirection,
    instructions,
  };
};

export const step = ({ grid, robots, scents, outcomes }: Mars): Mars => {
  const [robot, ...restRobots] = robots;
  const newRobot = moveRobot(robot, scents, grid);

  const isDead = isPositionOffGrid(grid, newRobot.position);
  if (isDead) {
    return {
      grid,
      robots: restRobots,
      scents: [...scents, robot.position],
      outcomes: [
        ...outcomes,
        {
          position: robot.position,
          direction: robot.direction,
          lost: true,
        },
      ],
    };
  }

  if (newRobot.instructions.length === 0) {
    return {
      grid,
      robots: restRobots,
      scents,
      outcomes: [
        ...outcomes,
        {
          position: newRobot.position,
          direction: newRobot.direction,
          lost: false,
        },
      ],
    };
  }

  return {
    grid,
    robots: [newRobot, ...restRobots],
    scents,
    outcomes,
  };
};

export const runInput = ({ grid, robots }: Input) => {
  let mars: Mars = { grid, robots, scents: [], outcomes: [] };
  while (mars.robots.length > 0) {
    mars = step(mars);
  }

  return mars.outcomes;
};

const inputIndex = process.argv.findIndex(arg => {
  return /^--input=(.+)$/.test(arg);
});

const inputPath =
  inputIndex >= 0 ? process.argv[inputIndex].split("=")[1] : null;

if (inputPath) {
  const fullPath = path.join(__dirname, inputPath);
  const file = readFileSync(fullPath, "utf8");

  const input = parse(file);
  const result = runInput(input);
  // Print output
  console.log(outputToString(result));
}
