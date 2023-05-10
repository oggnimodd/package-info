export const sortAndRemoveDuplicates = <T>(array: T[]): T[] => {
  const sortedArray = array.sort();
  const uniqueArray = Array.from(new Set(sortedArray));
  return uniqueArray;
};
