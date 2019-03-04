export enum Direction {
  N,
  E,
  S,
  W,
}

export enum Instruction {
  F,
  L,
  R,
}

export interface IRobot {
  position: [number, number];
  direction: Direction;
  instructions: Instruction[];
}

export interface IInput {
  grid: [number, number];
  robots: IRobot[];
}
