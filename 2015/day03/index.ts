import { getInputLineReader } from '../../utils';

const Stepper: Record<string, Function> = {
  '^': (coord: [number, number]) => [coord[0], coord[1] + 1],
  '>': (coord: [number, number]) => [coord[0] + 1, coord[1]],
  'v': (coord: [number, number]) => [coord[0], coord[1] - 1],
  '<': (coord: [number, number]) => [coord[0] - 1, coord[1]],
}

void (async () =>{
  const reader = getInputLineReader(__dirname);

  let currentPosition = [0, 0];
  let visitedCoords = new Set();
  visitedCoords.add(currentPosition.join(''));

  for await (const line of reader) {
    const steps = line.split('');

    for (const step of steps) {
      // Travel
      currentPosition = Stepper[step](currentPosition);

      // Update visited coordinates
      visitedCoords.add(currentPosition.join(''));
    }
  }

  console.log('Result:', visitedCoords.size);
})();