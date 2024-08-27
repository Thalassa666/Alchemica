import { BASE_URL } from '@core/utils/constants'

class AuthApi {
  private readonly url: string

  constructor(url: string, slug: string) {
    this.url = url + slug
  }
}
export const authApi = new AuthApi(BASE_URL, '/auth')
