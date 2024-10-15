export const generateRandomArray = (size: number, max: number) => {
  const array: number[] = [];
  while (array.length < size) {
    const randomIndex = Math.floor(Math.random() * max);
    if (!array.includes(randomIndex)) {
      array.push(randomIndex);
    }
  }
  return array;
};

export const generateOptions = (dotsCount: number): string[] => {
  var array: number[] = [];
  while (array.length < 4) {
    const ran = Math.floor(Math.random() * 6) + dotsCount - 3;
    if (array.indexOf(ran) === -1) {
      array.push(ran);
    }
  }
  if (array.indexOf(dotsCount) === -1) {
    array.pop();
    array.push(dotsCount);
  }
  return array.map(i => i.toString());
}

export const calculateScore = (
  dotsCount: number,
  timeSpent: number,
  decayFactor: number,
  isCorrect: boolean) =>
  (dotsCount / Math.pow(Math.max(timeSpent, 1), decayFactor)) * (isCorrect ? 1 : 0.5) * 1000;