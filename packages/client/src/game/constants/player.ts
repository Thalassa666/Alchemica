import { PlayerState } from '../types/types'

/** Направления игрока */
export const Direction = {
  Left: 'Left',
  Right: 'Right',
} as const

/** Начальное состояние игрока */
export const PlayerInitial: PlayerState = {
  position: { x: 50, y: 320 },
  velocity: { x: 0, y: 0 },
  size: { width: 150, height: 375 },
  lastDirectionX: Direction.Right,
  canMove: false,
}

/** Ускорение для движения */
export const VelocitySpeed = 6
