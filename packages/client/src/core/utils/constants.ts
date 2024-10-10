import { ILeaderboardResult } from './interfaces/Leaderboard'

export const BASE_URL = 'https://ya-praktikum.tech/api/v2'

export const redirect_uri = 'http://localhost:3000'

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
