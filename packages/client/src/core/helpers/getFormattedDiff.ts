export const getFormattedDiff = (
  start: number | null,
  end: number | null
): string => {
  if (!start || !end) {
    return ''
  }

  const ms = end - start
  const totalSeconds = Math.floor(ms / 1000) // Преобразуем миллисекунды в секунды

  const minutes = Math.floor(totalSeconds / 60) // Вычисляем количество минут и оставшихся секунд
  const seconds = totalSeconds % 60

  return `${minutes} мин. ${seconds} сек.` // Возвращаем форматированную строку
}
