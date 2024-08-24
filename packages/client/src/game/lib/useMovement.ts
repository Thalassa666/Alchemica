import { useWindowEffect } from '../../hooks/useWindowEffect'
import { EvtKeys } from '../constants/misc'
import { Direction } from '../constants/player'
import { DirectionType, Position } from '../types/types'
import { useGameState } from './useGameState'

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
    registerMoving({ x: -4 }, Direction.Left)
  }

  /** Движение вправо по оси X */
  const moveRight = () => {
    registerMoving({ x: 4 }, Direction.Right)
  }

  /** Остановиться по оси X */
  const stopMovingX = () => {
    registerMoving({ x: 0 }, getPlayer().lastDirectionX)
  }

  const handleKeydown = (evt: KeyboardEvent) => {
    const eventsMap = {
      [EvtKeys.A]: moveLeft,
      [EvtKeys.D]: moveRight,
    }

    eventsMap[evt.key]?.()
  }

  const handleKeyup = (evt: KeyboardEvent) => {
    const eventsMap = {
      [EvtKeys.A]: stopMovingX,
      [EvtKeys.D]: stopMovingX,
    }

    eventsMap[evt.key]?.()
  }

  useWindowEffect('keydown', handleKeydown)
  useWindowEffect('keyup', handleKeyup)
}
