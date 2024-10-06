import { checkResponse } from '@core/helpers/checkResponse'
import { BASE_URL } from '@core/utils/constants'
import {
  IUser,
  TOauthRequest,
  TOauthRequest1,
  TUserQuery,
} from '@core/utils/interfaces/User'

class AuthApi {
  private readonly url: string
  private readonly oauthUrl: string

  constructor(url: string, slug: string) {
    this.url = url + slug
    this.oauthUrl = url
  }

  // Запрос данных пользователя
  async fetchUser(): Promise<void> {
    const res = await fetch(`${this.url}/user`, {
      method: 'GET',
      credentials: 'include',
    })
    return await checkResponse(res)
  }

  // Вход в систему
  async signIn(data: TUserQuery): Promise<void> {
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
    const res = await fetch(`${this.url}/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    return await checkResponse(res)
  }

  // Вход в систему через Яндекс - узнать ИД
  async getAppID(): Promise<void> {
    const res = await fetch(`${this.oauthUrl}/oauth/yandex/service-id`, {
      method: 'GET',
      credentials: 'include',
    })
    return await checkResponse(res)
  }

  // Вход в систему через Яндекс
  async signInWithYandex(data: TOauthRequest1): Promise<void> {
    const res = await fetch(`${this.oauthUrl}/oauth/yandex`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + data.jwt,
      },
      body: JSON.stringify({
        code: data.code,
        redirect_uri: data.redirect_uri,
      }),
      credentials: 'include',
    })
    return await checkResponse(res)
  }

  // Запрос данных пользователя
  async fetchUser1(jwt: string): Promise<void> {
    const res = await fetch(`${this.url}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      },
      credentials: 'include',
    })
    return await checkResponse(res)
  }
}

export const authApi = new AuthApi(BASE_URL, '/auth')
