export enum Direction {
  N,
  E,
  S,
  W,
}

export enum Instruction {
  L = -1,
  F,
  R,
}

export interface Robot {
  position: [number, number];
  direction: Direction;
  instructions: Instruction[];
}

export interface Input {
  grid: [number, number];
  robots: Robot[];
}
