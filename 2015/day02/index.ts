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

function calculateVolume(l: number, w: number, h: number): number {
  return l * w * h;
}

void (async () => {
  let totalWrappingPaperArea = 0;
  let totalRibbonRequired = 0;

  const reader = getInputLineReader(__dirname);

  for await (const line of reader) {
    // eg. 2x3x4 -> [2,3,4]
    const [length, width, height] = line.split('x').map(c => Number(c));

    // Calculate wrapping paper
    const boxArea = getBoxArea(length, width, height);
    const smallestArea = getSmallestArea(length, width, height);
    const presentAreaTotal = boxArea + smallestArea;

    totalWrappingPaperArea += presentAreaTotal;

    // calculate amount of ribbon
    const ribbonForWrap = [length, width, height]
      /*
        Wow, I forgot JavaScript sorts numbers alphabetically by default.
        [29,7,5] was returning [29,5,7] because the "2" in 29 comes before 5 & 7.
        Ugggh... need to pass a custom sort function.
       */
      .sort((a,b) => a - b)
      .slice(0, 2)
      .map(n => n*2)
      .reduce((sum, n) => sum+n, 0);
    const ribbonForBow = calculateVolume(length, width, height);
    const ribbonTotal = ribbonForWrap + ribbonForBow;

    totalRibbonRequired += ribbonTotal;
  }

  console.log('Total amount of wrapping paper needed: ', totalWrappingPaperArea);
  console.log('Total amount of ribbon needed: ', totalRibbonRequired);
})();