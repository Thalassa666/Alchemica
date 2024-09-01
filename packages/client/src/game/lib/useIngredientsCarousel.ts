import { EvtKeys, GameColors } from '../constants/misc'
import { useWindowEffect } from '../../hooks/useWindowEffect'
import { CanvasContext, InventoryItem, Position, Size } from '../types/types'
import { BackgroundOptions, useBackground } from './useBackground'
import { useGameState } from './useGameState'
import IngredientsSelectSrc from '/ingredients-select.png'
import { centerActiveElement } from './centerActiveElement'
import { CraftDialogSizes } from '../constants/craftTools'

/** Использовать карусель (ящики) просмотра ингридиентов из инвентаря */
export const useIngredientsCarousel = () => {
  const { getInventory, updateInventory } = useGameState()
  const background = useBackground()

  const draw = (context: CanvasContext, dialogLocation: Position & Size) => {
    drawIngredientsBox(context, dialogLocation)
  }

  /** Отрисовать все ингридиенты из инвентаря */
  const drawIngredientsBox = (
    context: CanvasContext,
    dialogLocation: Position & Size
  ) => {
    const dialogBottom = dialogLocation.y + dialogLocation.height

    const size = {
      width:
        dialogLocation.width -
        CraftDialogSizes.OverlayPadding * 2 -
        CraftDialogSizes.ContentPadding * 2,
      height: CraftDialogSizes.IngredientsPickHeight,
    }

    const position = {
      x: dialogLocation.x + dialogLocation.width / 2 - size.width / 2,
      y:
        dialogBottom -
        size.height -
        CraftDialogSizes.OverlayPadding -
        CraftDialogSizes.ContentPadding,
    }

    const backgroundOptions: BackgroundOptions = {
      src: IngredientsSelectSrc,
      position,
      size,
    }

    background.draw(context, backgroundOptions)

    const inventoryState = getInventory()

    const elements = centerActiveElement(
      inventoryState.all,
      inventoryState.selectingIndex,
      CraftDialogSizes.MaxElements
    )

    elements.forEach((item, index) => {
      drawIngredient(context, { ...position, ...size }, item, index)
    })
  }

  /** Отрисовать конкретный ингридиент */
  const drawIngredient = (
    context: CanvasContext,
    boxesLocation: Position & Size,
    item: InventoryItem | null,
    index: number
  ) => {
    const isCentered = Math.floor(CraftDialogSizes.MaxElements / 2) === index

    if (!item || !item.imgSrc) {
      return
    }

    /* Не используются константы, т.к. подстраивается под спрайт */
    const position = {
      x: boxesLocation.x + 70 + 180 * index,
      y: isCentered ? boxesLocation.y + 30 : boxesLocation.y + 50,
    }

    const size = {
      width: isCentered
        ? CraftDialogSizes.PickIconWidthCentered
        : CraftDialogSizes.PickIconWidth,
      height: isCentered
        ? CraftDialogSizes.PickIconHeightCentered
        : CraftDialogSizes.PickIconHeight,
    }

    background.draw(context, { src: item.imgSrc, position, size })

    if (!isCentered) {
      return
    }

    context.ctx.font = `${CraftDialogSizes.PickFontSizeCentered}px serif`
    context.ctx.fillStyle = GameColors.TextColor
    context.ctx.textAlign = 'center'
    context.ctx.fillText(
      item.label,
      position.x + size.width / 2,
      boxesLocation.y + boxesLocation.height + CraftDialogSizes.OverlayPadding
    )
    context.ctx.textAlign = 'left'
  }

  const swipeLeft = () => {
    const updatedIndex = getInventory().selectingIndex - 1

    if (updatedIndex >= 0) {
      updateInventory({ selectingIndex: updatedIndex })
    }
  }

  const swipeRight = () => {
    const updatedIndex = getInventory().selectingIndex + 1

    if (updatedIndex <= getInventory().all.length - 1) {
      updateInventory({ selectingIndex: updatedIndex })
    }
  }

  const handleKeydown = (evt: KeyboardEvent) => {
    if (!getInventory().isPicking) {
      return
    }

    if (evt.key === EvtKeys.A || evt.key === EvtKeys.ArrowLeft) {
      swipeLeft()
    }

    if (evt.key === EvtKeys.D || evt.key === EvtKeys.ArrowRight) {
      swipeRight()
    }
  }

  useWindowEffect('keydown', handleKeydown)

  return {
    draw,
  }
}
