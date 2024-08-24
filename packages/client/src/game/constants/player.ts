import { PlayerState } from 'game/types/types'

export const Direction = {
  Left: 'Left',
  Right: 'Right',
} as const

export const PlayerInitial: PlayerState = {
  position: { x: 50, y: 380 },
  velocity: { x: 0, y: 0 },
  size: { width: 75, height: 300 },
  lastDirectionX: Direction.Right,
}
