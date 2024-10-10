export const checkResponseIsOk = (res: Response) => {
  if (res.status === 200) {
    return 'OK'
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}
