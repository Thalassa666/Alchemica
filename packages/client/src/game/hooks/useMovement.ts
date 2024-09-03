import { useWindowEffect } from '@core/hooks'
import { EvtCodes } from '@core/utils/constants'
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
    const eventsMap = {
      [EvtCodes.A]: moveLeft,
      [EvtCodes.D]: moveRight,
      [EvtCodes.ArrowLeft]: moveLeft,
      [EvtCodes.ArrowRight]: moveRight,
    }

    eventsMap[evt.code]?.()
  }

  const handleKeyup = (evt: KeyboardEvent) => {
    const eventsMap = {
      [EvtCodes.A]: stopMovingX,
      [EvtCodes.D]: stopMovingX,
      [EvtCodes.ArrowLeft]: stopMovingX,
      [EvtCodes.ArrowRight]: stopMovingX,
    }

    eventsMap[evt.code]?.()
  }

  useWindowEffect('keydown', handleKeydown)
  useWindowEffect('keyup', handleKeyup)
}
