/** Создать массив пустышку, с помощью которого можно центрировать активный элемент по индексу */
export const centerActiveElement = <T>(
  arr: T[],
  activeIndex: number,
  maxElements: number
): (T | null)[] => {
  const median = Math.floor(maxElements / 2)
  const result: (T | null)[] = new Array(maxElements).fill(null)

  const start = Math.max(activeIndex - median, 0)
  const end = Math.min(start + maxElements, arr.length)

  for (
    let i = start, j = Math.max(median - activeIndex, 0);
    i < end;
    i++, j++
  ) {
    result[j] = arr[i]
  }

  return result.slice(0, maxElements)
}
