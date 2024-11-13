import { useWindowEffect } from '@core/hooks'
import { runIfKeyMatch } from '@game/helpers/isGameKeyMatch'
import { CraftTools } from '../constants/craftTools'
import { GameColors } from '../constants/misc'
import { hasCollision } from '../helpers/hasCollision'
import { CanvasContext, CraftTool, Position, Size } from '../types/types'
import { useGameState } from './useGameState'
import { speak } from '@game/helpers/speechSynthesis'

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
            return {
              background: GameColors.CraftToolNearPlayer,
              text: GameColors.CraftToolNearPlayerText,
            }
          default:
            return {
              background: GameColors.CraftToolObject,
              text: GameColors.CraftToolObjectText,
            }
        }
      }

      const style = getStyle()

      /* Зона коллизии */
      context.ctx.fillStyle = style.background
      context.ctx.fillRect(x, y, width, height)
      context.ctx.fillStyle = 'transparent'

      /* Текст и box-shadow для него */
      const textPos = {
        x: x + width / 2,
        y: y - 50,
      }

      context.ctx.font = `20px serif`
      context.ctx.fillStyle = style.text
      context.ctx.textAlign = 'center'
      context.ctx.shadowColor = 'black'
      context.ctx.shadowBlur = 6
      context.ctx.lineWidth = 3

      context.ctx.strokeText(craftTool.label, textPos.x, textPos.y)
      context.ctx.fillText(craftTool.label, textPos.x, textPos.y)

      context.ctx.shadowBlur = 0
      context.ctx.lineWidth = 1
      context.ctx.shadowColor = 'transparent'
      context.ctx.textAlign = 'left'
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
    const currentNearPlayer = getCraftTools().nearPlayer

    if (currentNearPlayer?.key !== collision.key) {
      //озвучка активной коллизии
      speak(`${collision.label}`)
    }

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
