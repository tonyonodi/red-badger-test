import { Outcome } from "../index";

const directionStrings = ["N", "E", "S", "W"];

export default (output: Outcome[]) => {
  return output
    .map(({ position, direction, lost }) => {
      const directionString = directionStrings[direction];
      const lostString = lost ? " LOST" : "";

      return `${position[0]} ${position[1]} ${directionString}${lostString}`;
    })
    .join("\n\n");
};
