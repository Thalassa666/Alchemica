import { receiptToItem } from '@game/helpers/receiptToItem'
import { ReceptBookDialog } from '../constants/receipts'
import { CanvasContext, Receipt } from '../types/types'
import { useGameState } from './useGameState'
import { BackgroundOptions, useImage } from './useImage'
import { useMouseInteraction } from './useMouseInteraction'

type Props = {
  regModalSubscriber: (name: string) => void
}

/** Использовать книгу рецептов (список рецептов слева) */
export const useReceiptsBookReceiptsList = (props: Props) => {
  const { regModalSubscriber } = props
  const { getReceiptBook, updateReceiptBook } = useGameState()
  const image = useImage()
  const mouse = useMouseInteraction()

  /** Отрисовать список рецептов слева */
  const drawReceiptList = (context: CanvasContext, receipts: Receipt[]) => {
    receipts.forEach((receipt, index) => {
      drawReceiptListItem(context, receipt, index)
    })
  }

  /** Отрисовать рецепт в списке рецептов */
  const drawReceiptListItem = (
    context: CanvasContext,
    receipt: Receipt,
    index: number
  ) => {
    const item = receiptToItem(receipt)

    if (!item) {
      return
    }

    const gapY = index * ReceptBookDialog.receiptsList.gap.y

    /* Иконка */
    const iconOptions: BackgroundOptions = {
      src: item.imgSrc,
      position: {
        x: ReceptBookDialog.receiptsList.position.x,
        y:
          ReceptBookDialog.receiptsList.position.y -
          ReceptBookDialog.receiptsList.icon.height / 2 +
          gapY,
      },
      size: ReceptBookDialog.receiptsList.icon,
    }

    image.draw(context, iconOptions)

    /* Текст */
    const extraOffsetY = 10 // Дополнительно для центровки (вручную в зависимости от размера текста)

    const textPosition = {
      x:
        ReceptBookDialog.receiptsList.position.x +
        iconOptions.size.width +
        ReceptBookDialog.receiptsList.gap.x,
      y: ReceptBookDialog.receiptsList.position.y + gapY + extraOffsetY,
    }

    const isHovered = getReceiptBook().hovered?.key === item.key
    const isSelected = getReceiptBook().selected?.key === item.key

    const getTextColor = () => {
      switch (true) {
        case isHovered:
          return ReceptBookDialog.receiptsList.font.hoverColor
        case isSelected:
          return ReceptBookDialog.receiptsList.font.activeColor
        default:
          return ReceptBookDialog.receiptsList.font.color
      }
    }

    context.ctx.fillStyle = getTextColor()
    context.ctx.font = `${isSelected ? 'bold' : ''} ${
      ReceptBookDialog.receiptsList.font.size
    }px serif`
    context.ctx.fillText(item.label, textPosition.x, textPosition.y)
    context.ctx.fillStyle = 'transparent'

    /* Зона клика/hover */
    regModalSubscriber(receipt.key)

    mouse.draw(
      context,
      {
        x: iconOptions.position.x,
        y: iconOptions.position.y,
        width: ReceptBookDialog.receiptsList.clickableAreaWidth,
        height: iconOptions.size.height,
        name: receipt.key,
      },
      {
        onClick: () => {
          updateReceiptBook({ selected: receipt })
        },
        onMouseIn: () => {
          updateReceiptBook({ hovered: receipt })
        },
        onMouseOut: () => {
          updateReceiptBook({ hovered: null })
        },
      }
    )
  }

  return { drawReceiptList }
}
