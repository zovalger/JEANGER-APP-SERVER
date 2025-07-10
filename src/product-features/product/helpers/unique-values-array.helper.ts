export const uniqueValuesArrayHelper = <T>(arr: T[]): T[] => {
  const toSet: T[] = [];

  arr.map((item) => {
    if (!toSet.includes(item)) toSet.push(item);
  });

  return toSet;
};
