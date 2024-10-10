import { IUser } from './User'

export interface ILeaderboardGetParams {
  cursor: number
  limit: number
}

export interface ILeaderboardResult {
  alchemyGameScore: number
  startedAt: number
  endedAt: number
  user: IUser
}

export interface ILeaderboardResultData {
  data: ILeaderboardResult
}
