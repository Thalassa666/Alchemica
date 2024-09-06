import { CanvasContext } from '../types/types'
import { useCraftTools } from './useCraftTools'
import { useGameBorders } from './useGameBorders'
import { useGameState } from './useGameState'
import { useMovement } from './useMovement'

/** Использовать данные и управление игрока */
export const usePlayer = () => {
  useMovement()
  const { getPlayer, updatePlayer } = useGameState()
  const borders = useGameBorders()
  const craftTools = useCraftTools()

  /** Отрисовать положение игрока */
  const draw = (context: CanvasContext) => {
    const { position, size } = getPlayer()

    // TODO: Заменить на реальный спрайт
    context.ctx.fillStyle = 'green'
    context.ctx.fillRect(position.x, position.y, size.width, size.height)
  }

  /** Обновить положение игрока */
  const update = (_context: CanvasContext) => {
    const { position, velocity, size, canMove } = getPlayer()

    const updPosition = {
      x: position.x + velocity.x,
      y: position.y + velocity.y,
    }

    const updVelocity = {
      x: velocity.x,
      y: velocity.y,
    }

    const border = borders.checkForNearBorder({
      ...updPosition,
      ...size,
    })

    /* Сбросить все ускорения и позицию, если есть коллизия с границей игры */
    if (border || !canMove) {
      updVelocity.x = 0
      updVelocity.y = 0
      updPosition.x = position.x
      updPosition.y = position.y
    }

    craftTools.checkInteraction({ ...updPosition, ...size })

    updatePlayer({
      position: updPosition,
      velocity: updVelocity,
    })
  }

  return {
    draw,
    update,
  }
}
