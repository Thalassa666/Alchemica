import { checkResponse } from '@core/helpers'
import { forum_api_url } from '@core/utils/constants'
import { ITopic } from '@core/utils/interfaces/Forum'

class ForumApi {
  private readonly url: string

  constructor(url: string, slug: string) {
    this.url = url + slug
  }

  public async getTopics(): Promise<void> {
    const res = await fetch(`${forum_api_url}/topics`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return await checkResponse(res)
  }

  public async createTopic(data: ITopic): Promise<void> {
    const res = await fetch(`${forum_api_url}/topic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })
    return await checkResponse(res)
  }

  public async createComment(data: any): Promise<void> {
    const res = await fetch(`${forum_api_url}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })
    return await checkResponse(res)
  }
}

export const forumApi = new ForumApi(`http://localhost:3001`, '/topics')
export const forumApi1 = new ForumApi(`http://localhost:3001`, '/topic')
export const forumApi2 = new ForumApi(`http://localhost:3001`, '/comment')
