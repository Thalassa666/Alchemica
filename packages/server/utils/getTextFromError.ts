export const getTextFromError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }

  return 'Произошла непредвиденная ошибка'
}
