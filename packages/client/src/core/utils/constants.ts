import { ILeaderboardResult } from './interfaces/Leaderboard'

export const BASE_URL = 'https://ya-praktikum.tech/api/v2'

export const forum_api_url = 'https://alchemists-team.ya-praktikum.tech'

export const redirect_uri = 'https://alchemists-team.ya-praktikum.tech'

export const RATING_FIELD_NAME: keyof ILeaderboardResult = 'alchemyGameScore'

export const TEAM_NAME = 'Alchemy_Team'

export const EvtCodes = {
  W: 'KeyW',
  A: 'KeyA',
  S: 'KeyS',
  D: 'KeyD',
  J: 'KeyJ',
  K: 'KeyK',
  L: 'KeyL',
  Q: 'KeyQ',
  H: 'KeyH',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  Enter: 'Enter',
  Space: 'Space',
  Esc: 'Escape',
}
