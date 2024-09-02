export const checkResponse = (res: Response) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}
