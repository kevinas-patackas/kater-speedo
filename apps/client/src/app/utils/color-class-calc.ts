interface GetColorClassProps {
  current: number;
  min: number;
  max: number;
  inverse?: boolean;
}

export function getColorClass({
  current,
  min,
  max,
  inverse,
}: GetColorClassProps) {
  const colorIndices = inverse ? inverseIndices : idices;

  if (current <= min) {
    return `bg-speedo-${colorIndices[0]}`;
  }

  if (current >= max) {
    return `bg-speedo-${colorIndices[22]}`;
  }

  const adjustedMax = max - min;
  const value = current - min;
  const percentageValue = (value * 100) / adjustedMax;
  const colorIndex = Math.round((colorIndices.length * percentageValue) / 100);

  return `bg-speedo-${colorIndices[colorIndex - 1]}`;
}

const idices = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23,
];

const inverseIndices = [
  23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3,
  2, 1,
];
