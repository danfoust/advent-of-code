import { getInputLineReader } from '../../utils';

type Coord = [number, number];

const Stepper: Record<string, Function> = {
  '^': (coord: [number, number]) => [coord[0], coord[1] + 1],
  '>': (coord: [number, number]) => [coord[0] + 1, coord[1]],
  'v': (coord: [number, number]) => [coord[0], coord[1] - 1],
  '<': (coord: [number, number]) => [coord[0] - 1, coord[1]],
}

void (async () =>{
  const reader = getInputLineReader(__dirname);

  const startingPosition: Coord = [0, 0];
  const santas: Record<string, Coord> = {
    // The true santa
    true: startingPosition,
    // The false (robo) santa
    false: startingPosition,
  };

  let visitedCoords = new Set();
  visitedCoords.add(startingPosition.join(''));

  let isSantasTurn = true;

  for await (const line of reader) {
    const steps = line.split('');

    for (const step of steps) {
      // Travel
      santas[`${isSantasTurn}`] = Stepper[step](santas[`${isSantasTurn}`]);

      // Update visited coordinates
      visitedCoords.add(santas[`${isSantasTurn}`].join(''));

      // Toggle turn
      isSantasTurn = !isSantasTurn;
    }
  }

  console.log('Result:', visitedCoords.size);
})();