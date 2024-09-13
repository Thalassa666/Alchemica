import ArrowLeftImgSrc from '@assets/images/arrow-left.png'
import ArrowRightImgSrc from '@assets/images/arrow.png'
import { ReceptBookDialog } from '@game/constants/receipts'
import { CanvasContext, Collision } from '@game/types/types'
import { useGameState } from './useGameState'
import { BackgroundOptions, useImage } from './useImage'
import { useMouseInteraction } from './useMouseInteraction'

type Props = {
  regModalSubscriber: (name: string) => void
}

/* Вручную, в зависимости от высоты текста */
const ArrowYOffset = 6

/** Использовать пагинацию и получению данных в зависимости от страницы */
export const useReceiptsBookPagination = (props: Props) => {
  const { regModalSubscriber } = props
  const { getReceiptBook, getReceiptsList, updateReceiptBook } = useGameState()
  const image = useImage()
  const mouse = useMouseInteraction()

  /** Получить общее кол-во возможных страниц */
  const getPageTotal = () => {
    return Math.ceil(
      getReceiptsList().potions.length / ReceptBookDialog.pagination.sizePerPage
    )
  }

  /** Проверить можно ли переключиться на другую страницу */
  const checkIsPageValid = (updPage: number) => {
    return updPage >= 1 && updPage <= getPageTotal()
  }

  /** Уменьшить страницу */
  const decrementPage = () => {
    const updPage = getReceiptBook().activePage - 1

    if (checkIsPageValid(updPage)) {
      updateReceiptBook({ activePage: updPage })
    }
  }

  /** Увеличить страницу */
  const incrementPage = () => {
    const updPage = getReceiptBook().activePage + 1

    if (checkIsPageValid(updPage)) {
      updateReceiptBook({ activePage: updPage })
    }
  }

  /** Получить набор данных в зависимости от выбранной страницы */
  const getSlicedPotions = () => {
    const activePage = getReceiptBook().activePage
    const potionsList = getReceiptsList().potions

    const startIndex = activePage - 1
    const start = startIndex * ReceptBookDialog.pagination.sizePerPage
    const end = start + ReceptBookDialog.pagination.sizePerPage

    return potionsList.slice(start, end)
  }

  /** Отрисовать цифры стрелки пагинации */
  const drawPagination = (context: CanvasContext) => {
    const activePage = getReceiptBook().activePage
    const total = getPageTotal()
    const text = `${activePage}/${total}`

    context.ctx.fillStyle = ReceptBookDialog.pagination.font.color
    context.ctx.font = `${ReceptBookDialog.pagination.font.size}px serif`

    context.ctx.fillText(
      text,
      ReceptBookDialog.pagination.position.x,
      ReceptBookDialog.pagination.position.y
    )

    if (activePage > 1) {
      drawArrowLeft(context)
    }

    if (activePage < total) {
      drawArrowRight(context)
    }
  }

  /** Отрисовать стрелку влево и навесить на неё обработчик */
  const drawArrowLeft = (context: CanvasContext) => {
    const options: BackgroundOptions = {
      src: ArrowLeftImgSrc,
      size: ReceptBookDialog.pagination.iconArrow,
      position: {
        x:
          ReceptBookDialog.pagination.position.x -
          ReceptBookDialog.pagination.iconArrow.gap -
          ReceptBookDialog.pagination.iconArrow.width / 3,
        y:
          ReceptBookDialog.pagination.position.y -
          ReceptBookDialog.pagination.iconArrow.height / 2 -
          ArrowYOffset,
      },
    }

    image.draw(context, options)

    const collision: Collision = {
      name: 'ArrowLeft',
      ...options.size,
      ...options.position,
    }

    regModalSubscriber(collision.name)
    mouse.draw(context, collision, { onClick: decrementPage })
  }

  /** Отрисовать стрелку вправо и навесить на неё обработчик */
  const drawArrowRight = (context: CanvasContext) => {
    const options: BackgroundOptions = {
      src: ArrowRightImgSrc,
      size: ReceptBookDialog.pagination.iconArrow,
      position: {
        x:
          ReceptBookDialog.pagination.position.x +
          ReceptBookDialog.pagination.iconArrow.gap,
        y:
          ReceptBookDialog.pagination.position.y -
          ReceptBookDialog.pagination.iconArrow.height / 2 -
          ArrowYOffset,
      },
    }

    image.draw(context, options)

    const collision: Collision = {
      name: 'ArrowRight',
      ...options.size,
      ...options.position,
    }

    regModalSubscriber(collision.name)
    mouse.draw(context, collision, { onClick: incrementPage })
  }

  return { drawPagination, getSlicedPotions }
}
