"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export const runInput = ({ grid, robots }: Input) => {
//   robots.reduce(runRobot, {grid, scents: []})
// };
var inputIndex = process.argv.findIndex(function (arg) {
    return /^--input=(.+)$/.test(arg);
});
var inputPath = inputIndex >= 0 ? process.argv[inputIndex].split("=")[1] : null;
if (inputPath) {
    // Read in file
    // Parse file into input
    // Run input
    // Print output
}
