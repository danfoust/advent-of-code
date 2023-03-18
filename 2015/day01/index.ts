import { loadInput } from '../../utils';

const DIRECTION_MAP: Record<string, 1 | -1> = {
  '(': 1,
  ')': -1,
};
const input = loadInput(__dirname);

let floor = 0;
let firstHitBasement = null;

for (let i = 0; i < input.length; i++) {
  floor += DIRECTION_MAP[input[i]];

  if (floor === -1 && firstHitBasement === null) {
    // Does not use zero offset, first position is 1
    firstHitBasement = i + 1;
  }
}

console.log('Final floor: ', floor);
console.log('Position of first character to enter basement: ', firstHitBasement);