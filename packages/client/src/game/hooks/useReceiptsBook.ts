import ReceiptBookImgSrc from '@assets/images/background-receipts-book.png'
import { useWindowEffect } from '@core/hooks'
import { EvtCodes } from '@core/utils/constants'
import { useRef } from 'react'
import { ReceptBookDialog } from '../constants/receipts'
import { CanvasContext } from '../types/types'
import { useGameState } from './useGameState'
import { BackgroundOptions, useImage } from './useImage'
import { useMouseInteraction } from './useMouseInteraction'
import { useReceiptsBookComboList } from './useReceiptsBookComboList'
import { useReceiptsBookPagination } from './useReceiptsBookPagination'
import { useReceiptsBookReceiptsList } from './useReceiptsBookReceiptsList'

/** Использовать книгу рецептов */
export const useReceiptsBook = () => {
  const { getReceiptBook, updateReceiptBook, updatePlayer, getReceiptsList } =
    useGameState()

  const subscribedNamesRef = useRef<string[]>([])

  /* Точечное зарегистрировать подписки на мышь только в этом модальном окне, чтобы удалить после закрытия */
  const regModalSubscriber = (name: string) => {
    subscribedNamesRef.current.push(name)
  }

  const image = useImage()
  const receiptsList = useReceiptsBookReceiptsList({ regModalSubscriber })
  const comboList = useReceiptsBookComboList()
  const pagination = useReceiptsBookPagination({ regModalSubscriber })
  const mouse = useMouseInteraction()

  const handleKeydown = (evt: KeyboardEvent) => {
    if (evt.code === EvtCodes.J) {
      updateReceiptBook({
        isDialogOpen: true,
        selected: getReceiptsList().potions[0],
      })
      updatePlayer({ canMove: false })
    }

    if (evt.code === EvtCodes.Esc && getReceiptBook().isDialogOpen) {
      updateReceiptBook({ isDialogOpen: false, hovered: null, selected: null })
      updatePlayer({ canMove: true })

      /* Отписываемся от всех событий на мышь при закрытии */
      subscribedNamesRef.current.forEach(name => {
        mouse.unSubscribe(name)
      })
    }
  }

  useWindowEffect('keydown', handleKeydown)

  /** Отрисовать только, когда модальное окно открыто */
  const draw = (context: CanvasContext) => {
    if (!getReceiptBook().isDialogOpen) {
      return
    }

    const receipts = pagination.getSlicedPotions()

    subscribedNamesRef.current = []
    drawBackground(context)
    receiptsList.drawReceiptList(context, receipts)
    comboList.drawComboList(context)
    pagination.drawPagination(context)
  }

  /** Отрисовать изображение в качестве заднего фона */
  const drawBackground = (context: CanvasContext) => {
    const backgroundOptions: BackgroundOptions = {
      src: ReceiptBookImgSrc,
      position: ReceptBookDialog.getPosition(),
      size: ReceptBookDialog.size,
    }

    image.drawOverlayFullSize(context)
    image.draw(context, backgroundOptions)
  }

  return { draw }
}
