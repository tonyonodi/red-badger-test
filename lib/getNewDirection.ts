import { Direction, Instruction } from "../Input";

export default (direction: Direction, instruction: Instruction): Direction => {
  const d = direction + instruction;
  return ((d % 4) + 4) % 4;
};
