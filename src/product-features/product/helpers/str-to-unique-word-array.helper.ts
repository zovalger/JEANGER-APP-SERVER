import { keywordsNormalizeHelper } from './keywords-normalize.helper';

export const strToUniqueWordArrayHelper = (t: string): string[] => {
  const toSet: string[] = [];

  t.split(' ').map((word) => {
    const normilizeWord = keywordsNormalizeHelper(word);
    if (normilizeWord.length >= 2 && !toSet.includes(normilizeWord))
      toSet.push(normilizeWord);
  });

  return toSet;
};
