import { GameBorders, GameColors } from '../constants/misc'
import { hasCollision } from '../helpers/hasCollision'
import { CanvasContext, FullLocation } from '../types/types'

const gameBorderValues = Object.values(GameBorders)

/** Использовать границы игры */
export const useGameBorders = () => {
  /** Отрисовать границы игры */
  const draw = (context: CanvasContext) => {
    gameBorderValues.forEach(collision => {
      const { x, y, width, height } = collision

      context.ctx.fillStyle = GameColors.Border
      context.ctx.fillRect(x, y, width, height)
    })
  }

  /** Проверить есть ли коллизия с границей игры у переданной локации */
  const checkForNearBorder = (location: FullLocation) => {
    return gameBorderValues.find(collision => hasCollision(location, collision))
  }

  return {
    draw,
    checkForNearBorder,
  }
}
