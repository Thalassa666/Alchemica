import { BASE_URL } from '@core/utils/constants'
import { checkResponse } from '@core/helpers/checkResponse'
import { IUser, TUserQuery } from '@core/utils/interfaces/User'

class AuthApi {
  private readonly url: string

  constructor(url: string, slug: string) {
    this.url = url + slug
  }

  // Запрос данных пользователя
  public async fetchUser(): Promise<void> {
    const res = await fetch(`${this.url}/user`, {
      method: 'GET',
      credentials: 'include',
    })
    return await checkResponse(res)
  }

  // Вход в систему
  public async signIn(data: TUserQuery): Promise<void> {
    const res = await fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })
    return await checkResponse(res)
  }

  // Регистрация в системе
  public async signUp(data: IUser): Promise<void> {
    const res = await fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })
    return await checkResponse(res)
  }

  // Выход из системы
  public async logout(): Promise<void> {
    const res = await fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    return await checkResponse(res)
  }
}

export const authApi = new AuthApi(BASE_URL, '/auth')
