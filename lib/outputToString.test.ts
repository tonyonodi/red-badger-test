import { Direction } from "../Input";
import { Outcome } from "../index";
import outputToString from "./outputToString";

// position: [number, number];
// direction: Direction;
// lost: boolean;

describe(`output to string`, () => {
  const output = [
    {
      position: [1, 1] as [number, number],
      direction: Direction.E,
      lost: false,
    },
    {
      position: [3, 3] as [number, number],
      direction: Direction.N,
      lost: true,
    },
    {
      position: [2, 3] as [number, number],
      direction: Direction.S,
      lost: false,
    },
  ];

  const outputString = `1 1 E

3 3 N LOST

2 3 S`;

  it(`should convert output to a string correctly`, () => {
    expect(outputToString(output)).toEqual(outputString);
  });
});
