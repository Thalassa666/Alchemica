/** Сгруппировать массив объектов по ключу, получаемый в результате вызова accessorFn */
export const groupArray = <T = unknown>(
  array: T[],
  accessorFn: (item: T) => string
): Record<string, T[]> => {
  const result: Record<string, T[]> = {}

  array.forEach(item => {
    const accessor = accessorFn(item)

    if (!result[accessor]) {
      result[accessor] = []
    }

    result[accessor].push(item)
  })

  return result
}
