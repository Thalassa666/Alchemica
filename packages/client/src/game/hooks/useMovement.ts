import { useWindowEffect } from '@core/hooks'
import { runIfKeyMatch } from '@game/helpers/isGameKeyMatch'
import { Direction, VelocitySpeed } from '../constants/player'
import { DirectionType, Position } from '../types/types'
import { useGameState } from './useGameState'

/** Использовать движения персонажа */
export const useMovement = () => {
  const { getPlayer, updatePlayer } = useGameState()

  /** Изменить движение. Все направления должны использовать эту функцию */
  const registerMoving = (
    velocity: Partial<Position>,
    direction: DirectionType
  ) => {
    const updatedVelocity = { ...getPlayer().velocity, ...velocity }

    updatePlayer({ velocity: updatedVelocity, lastDirectionX: direction })
  }

  /** Движение влево по оси X */
  const moveLeft = () => {
    registerMoving({ x: VelocitySpeed * -1 }, Direction.Left)
  }

  /** Движение вправо по оси X */
  const moveRight = () => {
    registerMoving({ x: VelocitySpeed }, Direction.Right)
  }

  /** Остановиться по оси X */
  const stopMovingX = () => {
    registerMoving({ x: 0 }, getPlayer().lastDirectionX)
  }

  const handleKeydown = (evt: KeyboardEvent) => {
    runIfKeyMatch('MoveLeft', evt, moveLeft)
    runIfKeyMatch('MoveRight', evt, moveRight)
  }

  const handleKeyup = (evt: KeyboardEvent) => {
    runIfKeyMatch('MoveLeft', evt, stopMovingX)
    runIfKeyMatch('MoveRight', evt, stopMovingX)
  }

  useWindowEffect('keydown', handleKeydown)
  useWindowEffect('keyup', handleKeyup)
}
