/** Трансформировать массив в хэш объект по ключу, получаемый в результате вызова accessorFn  */
export const arrayToMapObject = <T = unknown>(
  array: T[],
  accessorFn: (item: T) => string
): Record<string, T> => {
  const result: Record<string, T> = {}

  array.forEach(item => {
    const accessor = accessorFn(item)

    result[accessor] = item
  })

  return result
}
