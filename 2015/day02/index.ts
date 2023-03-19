import { getInputLineReader } from '../../utils';

function getBoxArea(l: number, w: number, h: number): number {
  const area = (2*l*w) + (2*w*h) + (2*h*l);

  return area
}

function getSmallestArea(l: number, w: number, h: number): number {
  const side1 = l*w;
  const side2 = w*h;
  const side3 = h*l;

  return Math.min(side1, side2, side3);
}

void (async () => {
  const reader = getInputLineReader(__dirname);

  let totalWrappingPaperArea = 0;

  reader.on('line', (line) => {
    const [length, width, height] = line.split('x').map(c => Number(c));

    const boxArea = getBoxArea(length, width, height);
    const smallestArea = getSmallestArea(length, width, height);
    const presentAreaTotal = boxArea + smallestArea;

    totalWrappingPaperArea += presentAreaTotal;
  });

  await new Promise(res => reader.once('close', res));

  console.log('Total Wrapping paper needed: ', totalWrappingPaperArea);
})();