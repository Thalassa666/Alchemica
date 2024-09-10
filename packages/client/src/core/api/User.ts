import { checkResponse } from '@core/helpers/checkResponse'
import { IUser, IUserChangePass, TUserQuery } from '@core/utils/interfaces/User'
import { BASE_URL } from '@core/utils/constants'

class User {
  private readonly url: string

  constructor(url: string, slug: string) {
    this.url = url + slug
  }

  public async updateUserData(data: IUserChangePass) {
    const res = await fetch(`${this.url}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })
    await checkResponse(res)
  }

  public async changeAvatar(file: File): Promise<void> {
    const data = new FormData()
    data.append('avatar', file)
    const res = await fetch(`${this.url}/profile/avatar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })
    await checkResponse(res)
  }

  public async changePassword(data: IUserChangePass) {
    const res = await fetch(`${this.url}/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })
    console.log(data)
    await checkResponse(res)
  }
}

export const userApi = new User(BASE_URL, '/user')
