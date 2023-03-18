import { loadInput } from '../../utils';

const DIRECTION_MAP: Record<string, 1 | -1> = {
  '(': 1,
  ')': -1,
};
const input = loadInput(__dirname);

let floor = 0;

for (let i = 0; i < input.length; i++) {
  floor += DIRECTION_MAP[input[i]];
}

console.log('Final floor: ', floor);