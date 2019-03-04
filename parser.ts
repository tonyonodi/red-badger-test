import { Direction, Instruction, IInput, IRobot } from "./IInput";

export const tokeniser = (string: string) => {
  return string.split(/\n+/);
};

export const parseGridString = (gridString: string): [number, number] => {
  const match = /^\s*(\d+)\s+(\d+)\s*$/.exec(gridString);
  if (!match) {
    throw new Error(`Parse error: "${gridString}" is not a valid grid string.`);
  }

  return [parseInt(match[1]), parseInt(match[2])];
};

const instructionsDict: { [char: string]: Instruction } = {
  F: Instruction.F,
  L: Instruction.L,
  R: Instruction.R,
};

export const parseRobotInstructions = (instructionsString: string) => {
  const instructionChars = instructionsString.split(/s*/);
  const instructions = instructionChars.map(char => {
    const instruction = instructionsDict[char];
    if (instruction === undefined) {
      throw new Error(`Parse error: "${char}" is not a valid instruction.`);
    }
    return instruction;
  });

  return instructions;
};

const directionsDict: { [char: string]: Direction } = {
  N: Direction.N,
  S: Direction.S,
  E: Direction.E,
  W: Direction.W,
};

export const parseRobotOrientation = (
  orientationString: string
): { position: [number, number]; direction: Direction } => {
  const match = /^\s*(\d+)\s+(\d+)\s+([NSEW])\s*$/.exec(orientationString);
  if (!match) {
    throw new Error(
      `Parse error: "${orientationString}" is not a valid orientation string.`
    );
  }

  const [_, x, y, dir] = match;

  return {
    position: [parseInt(x), parseInt(y)],
    direction: directionsDict[dir],
  };
};

export const parseRobotLines = (
  lines: string[],
  robots: IRobot[] = []
): IRobot[] => {
  if (lines.length === 0) return robots;

  const [orientationString, instructionsString, ...remainingLines] = lines;
  if (!instructionsString) throw new Error(`Unexpected end of input.`);
  const { position, direction } = parseRobotOrientation(orientationString);
  const instructions = parseRobotInstructions(instructionsString);

  const robot: IRobot = {
    position,
    direction,
    instructions,
  };

  return parseRobotLines(remainingLines, [...robots, robot]);
};

export default (inputString: string): IInput => {
  // Because this grammar is very simple we can tokenise by line.
  const [gridString, ...robotLines] = tokeniser(inputString);
  const grid = parseGridString(gridString);

  const robots = parseRobotLines(robotLines);
  return {
    grid,
    robots,
  };
};
