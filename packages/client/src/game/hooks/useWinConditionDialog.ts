import { useWindowEffect } from '@core/hooks'
import { EvtCodes } from '@core/utils/constants'
import { Game, GameColors } from '@game/constants/misc'
import { CanvasContext, InventoryItem, Position } from '@game/types/types'
import { useGameState } from './useGameState'
import { BackgroundOptions, useImage } from './useImage'

const DialogConfig = {
  size: { width: 500, height: 250 },
  padding: { x: 15, y: 15 },
  getPosition: function getPosition() {
    return {
      x: Game.Size.width / 2 - this.size.width / 2,
      y: Game.Size.height / 2 - this.size.height / 2,
    }
  },
  title: {
    text: 'Для победы Вам необходимо создать:',
    size: 25,
    color: GameColors.TextColor,
  },
  receiptList: {
    gap: { x: 20, y: 20 },
  },
  receiptIcon: {
    width: 50,
    height: 50,
  },
  receiptText: {
    size: 20,
    color: GameColors.TextColor,
  },
}

export const useWinConditionDialog = () => {
  const { getStatistic, updatePlayer, updateStatistic } = useGameState()
  const image = useImage()

  const handleKeydown = (evt: KeyboardEvent) => {
    if (evt.code === EvtCodes.K && !getStatistic().isWinConditionDialogOpen) {
      updateStatistic({ isWinConditionDialogOpen: true })
      updatePlayer({ canMove: false })
    }

    /* Закрытие на любую клавишу, кроме открытия */
    if (evt.code !== EvtCodes.K && getStatistic().isWinConditionDialogOpen) {
      updateStatistic({ isWinConditionDialogOpen: false })
      updatePlayer({ canMove: true })
    }
  }

  useWindowEffect('keydown', handleKeydown)

  const draw = (context: CanvasContext) => {
    if (!getStatistic().isWinConditionDialogOpen) {
      return
    }

    drawOverlay(context)
    drawTitle(context)
    drawReceiptList(context)
  }

  const drawOverlay = (context: CanvasContext) => {
    image.drawOverlayFullSize(context)
    image.drawOverlayByLocation(context, {
      width: DialogConfig.size.width,
      height: DialogConfig.size.height,
      x: DialogConfig.getPosition().x,
      y: DialogConfig.getPosition().y,
    })
  }

  const drawTitle = (context: CanvasContext) => {
    context.ctx.font = `${DialogConfig.title.size}px serif`
    context.ctx.fillStyle = DialogConfig.title.color
    context.ctx.textAlign = 'center'

    context.ctx.fillText(
      DialogConfig.title.text,
      DialogConfig.getPosition().x + DialogConfig.size.width / 2,
      DialogConfig.getPosition().y + DialogConfig.padding.y
    )
    context.ctx.textAlign = 'left'
  }

  const drawReceiptList = (context: CanvasContext) => {
    getStatistic().itemsToWin.forEach((item, index) => {
      const position = {
        x: DialogConfig.getPosition().x + DialogConfig.padding.x,
        y:
          DialogConfig.getPosition().y +
          50 + // Вручную, в зависимости от размера текста
          (DialogConfig.receiptList.gap.y + DialogConfig.receiptIcon.height) *
            index,
      }

      drawReceiptRow(context, item, position)
    })
  }

  const drawReceiptRow = (
    context: CanvasContext,
    item: InventoryItem,
    position: Position
  ) => {
    const iconOptions: BackgroundOptions = {
      src: item.imgSrc,
      size: DialogConfig.receiptIcon,
      position,
    }

    image.draw(context, iconOptions)

    context.ctx.font = `${DialogConfig.receiptText.size}px serif`
    context.ctx.fillStyle = DialogConfig.receiptText.color

    context.ctx.fillText(
      item.label,
      iconOptions.position.x +
        iconOptions.size.width +
        DialogConfig.receiptList.gap.x,
      iconOptions.position.y + iconOptions.size.height / 2 + 10 // Вручную, в зависимости от размера текста
    )
  }

  return {
    draw,
  }
}
