import { useWindowEffect } from '@core/hooks'
import { runIfKeyMatch } from '@game/helpers/isGameKeyMatch'
import { CraftTools } from '../constants/craftTools'
import { GameColors } from '../constants/misc'
import { hasCollision } from '../helpers/hasCollision'
import { CanvasContext, CraftTool, Position, Size } from '../types/types'
import { useGameState } from './useGameState'

const craftToolsValues = Object.values(CraftTools)

/** Использовать коллизии для крафтовых инструментов */
export const useCraftTools = () => {
  const { getCraftTools, updateCraftTools } = useGameState()

  /** 
    При использовании OK клавиши и нахождении инструмента рядом с игроком - установить его активным 
    При установлении как активным - открывает модальное окно 
  */
  const handleKeydown = (evt: KeyboardEvent) => {
    const interactable = getCraftTools().nearPlayer

    if (!interactable) {
      return
    }

    const onInteract = () => {
      updateCraftTools({ active: interactable })
    }

    runIfKeyMatch('Interact', evt, onInteract)
  }

  useWindowEffect('keydown', handleKeydown)

  /** Отрисовать существующие интерактивные объекты и тот объект, что находится в коллизии с игроком */
  const draw = (context: CanvasContext) => {
    craftToolsValues.forEach(craftTool => {
      const { x, y, width, height } = craftTool.collision

      const getStyle = () => {
        switch (true) {
          case getCraftTools().nearPlayer?.key === craftTool.key:
            return GameColors.CraftToolNearPlayer
          default:
            return GameColors.CraftToolObject
        }
      }

      context.ctx.fillStyle = getStyle()
      context.ctx.fillRect(x, y, width, height)
      context.ctx.fillStyle = 'transparent'
    })
  }

  /** Проверить пересекается ли игрок с интерактивным объектом */
  const checkInteraction = (location: Position & Size) => {
    const craftTool = craftToolsValues.find(tool =>
      hasCollision(location, tool.collision)
    )

    if (craftTool) {
      activateTool(craftTool)
    } else {
      deactivateTool()
    }
  }

  /** Установить интерактивный объект как объект рядом с игроком */
  const activateTool = (collision: CraftTool) => {
    updateCraftTools({ nearPlayer: collision })
  }

  /** Забыть про объект рядом с игроком */
  const deactivateTool = () => {
    updateCraftTools({ nearPlayer: null })
  }

  return {
    draw,
    checkInteraction,
  }
}
