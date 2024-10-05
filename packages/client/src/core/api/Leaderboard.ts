import { checkResponse } from '@core/helpers'
import { BASE_URL, RATING_FIELD_NAME, TEAM_NAME } from '@core/utils/constants'
import {
  ILeaderboardGetParams,
  ILeaderboardResult,
  ILeaderboardResultData,
} from '@core/utils/interfaces/Leaderboard'

class LeaderboardApi {
  private readonly url: string

  constructor(url: string, slug: string) {
    this.url = url + slug
  }

  public async getLeaderboard(
    data: ILeaderboardGetParams
  ): Promise<ILeaderboardResultData[]> {
    const res = await fetch(`${this.url}/all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ratingFieldName: RATING_FIELD_NAME, ...data }),
      credentials: 'include',
    })

    return await checkResponse(res)
  }

  public async shareResult(data: ILeaderboardResult): Promise<void> {
    const res = await fetch(`${this.url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ratingFieldName: RATING_FIELD_NAME,
        teamName: TEAM_NAME,
        data,
      }),
      credentials: 'include',
    })

    await checkResponse(res)
  }
}

export const leaderboardApi = new LeaderboardApi(BASE_URL, '/leaderboard')
