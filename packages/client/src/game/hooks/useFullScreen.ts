import { useWindowEffect } from '@core/hooks'
import { Game, GameColors } from '@game/constants/misc'
import { runIfKeyMatch } from '@game/helpers/isGameKeyMatch'
import { CanvasContext, Position } from '@game/types/types'
import { useRef } from 'react'
import { useGameState } from './useGameState'
import { useImage } from './useImage'

const DialogConfig = {
  size: { width: 500, height: 65 },
  padding: { x: 8, y: 8 },
  getPosition: function getPosition() {
    return {
      x: Game.Size.width / 2 - this.size.width / 2,
      y: 50,
    }
  },
  title: {
    size: 20,
    color: GameColors.TextColor,
  },
  text: {
    size: 16,
    color: GameColors.TextColor,
    gap: { y: 30 },
  },
}

export const useFullScreen = () => {
  const { getStatistic, updateStatistic } = useGameState()
  const image = useImage()
  const lastContextRef = useRef<CanvasContext | null>(null)

  const init = (context: CanvasContext) => {
    lastContextRef.current = context
    context.canvas.requestFullscreen()
  }

  const draw = (context: CanvasContext) => {
    if (!getStatistic().isIntroDialogOpen) {
      return
    }

    drawOverlay(context)
    const titlePos = drawTitle(context)
    const modalTextPos = drawText(
      context,
      'Q - Для закрытия модальных окон в этом режиме',
      titlePos
    )
    drawText(
      context,
      'H - Для переключения полноэкранного режима',
      modalTextPos
    )
  }

  const drawOverlay = (context: CanvasContext) => {
    image.drawOverlayByLocation(context, {
      width: DialogConfig.size.width,
      height: DialogConfig.size.height,
      x: DialogConfig.getPosition().x,
      y: DialogConfig.getPosition().y,
    })
  }

  const drawTitle = (context: CanvasContext): Position => {
    context.ctx.font = `${DialogConfig.title.size}px serif`
    context.ctx.fillStyle = DialogConfig.title.color
    context.ctx.textAlign = 'center'

    const titlePos: Position = {
      x:
        DialogConfig.getPosition().x +
        DialogConfig.size.width / 2 +
        DialogConfig.padding.x,
      y: DialogConfig.getPosition().y + DialogConfig.padding.y,
    }

    context.ctx.fillText('Вы в полноэкранном режиме', titlePos.x, titlePos.y)
    context.ctx.textAlign = 'left'

    return titlePos
  }

  const drawText = (
    context: CanvasContext,
    text: string,
    prevTextPos: Position
  ): Position => {
    context.ctx.font = `${DialogConfig.text.size}px serif`
    context.ctx.fillStyle = DialogConfig.text.color

    const textPos: Position = {
      x: DialogConfig.getPosition().x + DialogConfig.padding.x,
      y: prevTextPos.y + DialogConfig.text.gap.y,
    }

    context.ctx.fillText(text, textPos.x, textPos.y)
    context.ctx.fillStyle = 'transparent'

    return textPos
  }

  const handleKeydown = (evt: KeyboardEvent) => {
    const closeModal = () => {
      if (!getStatistic().isIntroDialogOpen) {
        return
      }

      updateStatistic({ isIntroDialogOpen: false })
    }

    const toggleFullScreen = () => {
      const canvasElement = lastContextRef.current?.canvas

      if (canvasElement && !document.fullscreenElement) {
        canvasElement.requestFullscreen()
        return
      }

      if (document.fullscreenElement) {
        document.exitFullscreen()
      }
    }

    runIfKeyMatch('Exit', evt, closeModal)
    runIfKeyMatch('FullScreen', evt, toggleFullScreen)
  }

  useWindowEffect('keydown', handleKeydown)

  return { init, draw }
}
