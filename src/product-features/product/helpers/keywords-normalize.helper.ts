export const keywordsNormalizeHelper = (t: string): string => {
  const r = new RegExp(
    '([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+',
    'gi',
  );

  return t.toLowerCase().normalize('NFD').replace(r, '$1').normalize().trim();
};
