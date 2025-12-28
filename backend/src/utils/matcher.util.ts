export function extractKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .split(' ')
    .filter(word => word.length > 3);
}

export function isMatch(text1: string, text2: string): boolean {
  const keywords1 = extractKeywords(text1);
  const keywords2 = extractKeywords(text2);

  return keywords1.some(word => keywords2.includes(word));
}
