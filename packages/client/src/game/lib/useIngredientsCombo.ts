import { GameColors } from '../constants/misc'
import { CraftDialogSizes } from '../constants/craftTools'
import {
  CanvasContext,
  CraftTool,
  InventoryItem,
  Position,
  Size,
} from '../types/types'

import { useBackground } from './useBackground'
import { useGameState } from './useGameState'
import IngredientBoxSrc from '/ingredient-box.png'

const getPosY = (dialogPosY: number, rowIndex: number) => {
  return (
    dialogPosY +
    CraftDialogSizes.OverlayPadding +
    CraftDialogSizes.ContentPadding +
    (CraftDialogSizes.ComboSquareHeight + CraftDialogSizes.ComboRowOffset) *
      rowIndex
  )
}

const getPosX = (dialogPosX: number, columnIndex: number) => {
  return (
    dialogPosX +
    CraftDialogSizes.OverlayPadding +
    CraftDialogSizes.ContentPadding +
    (CraftDialogSizes.ComboSquareWidth + CraftDialogSizes.ComboColumnOffset) *
      columnIndex
  )
}

/** Использовать ленту комбинирования ингредиентов в новый ингредиент/зелье */
export const useIngredientsCombo = () => {
  const { getCraftTools, getInventory } = useGameState()
  const background = useBackground()

  /** Отрисовать всю ленту */
  const draw = (context: CanvasContext, dialogLocation: Position & Size) => {
    const activeTool = getCraftTools().active

    if (!activeTool) {
      return
    }

    drawTool(context, dialogLocation, activeTool)

    let boxesBeforeCount = 1

    getInventory().selected.forEach((item, index) => {
      boxesBeforeCount++
      drawIngredient(context, dialogLocation, item, index)
    })

    drawResult(context, dialogLocation, boxesBeforeCount)
  }

  /** Отрисовать инструмент, на котором происходит взаимодействие */
  const drawTool = (
    context: CanvasContext,
    dialogLocation: Position & Size,
    craftTool: CraftTool
  ) => {
    drawSquare(
      context,
      { x: getPosX(dialogLocation.x, 0), y: getPosY(dialogLocation.y, 0) },
      craftTool.imgSrc,
      craftTool.label
    )
  }

  /** Отрисовать ингредиент */
  const drawIngredient = (
    context: CanvasContext,
    dialogLocation: Position & Size,
    ingredient: InventoryItem | null,
    index: number
  ) => {
    drawSquare(
      context,
      {
        x: getPosX(dialogLocation.x, index + 1),
        y: getPosY(dialogLocation.y, 0),
      },
      ingredient?.imgSrc ?? '',
      ingredient?.label ?? 'Выберите'
    )
  }

  /** Отрисовать то, что получается из ингредиентов */
  const drawResult = (
    context: CanvasContext,
    dialogLocation: Position & Size,
    boxesBeforeCount: number
  ) => {
    const itemByReceipt = getInventory().itemByReceipt

    drawSquare(
      context,
      {
        x: getPosX(dialogLocation.x, boxesBeforeCount),
        y: getPosY(dialogLocation.y, 0),
      },
      itemByReceipt?.imgSrc ?? '',
      itemByReceipt?.label ?? 'Выберите ингредиенты'
    )
  }

  /** Отрисовать квадрат - ячейку для вставки всех прочих элементов ленты */
  const drawSquare = (
    context: CanvasContext,
    position: Position,
    contentSrc: string,
    text: string
  ) => {
    const boxImgSize = {
      width: CraftDialogSizes.ComboSquareWidth,
      height: CraftDialogSizes.ComboSquareHeight,
    }

    background.draw(context, {
      src: IngredientBoxSrc,
      position,
      size: boxImgSize,
    })

    const offset = 30

    background.draw(context, {
      src: contentSrc,
      position: {
        x: position.x + offset / 2,
        y: position.y + offset / 2,
      },
      size: {
        width: boxImgSize.width - offset,
        height: boxImgSize.height - offset,
      },
    })

    context.ctx.font = `${CraftDialogSizes.ComboFontSizeCentered}px serif`
    context.ctx.fillStyle = GameColors.TextColor
    context.ctx.textAlign = 'center'
    context.ctx.fillText(
      text,
      position.x + boxImgSize.width / 2,
      position.y + boxImgSize.height + 15
    )
    context.ctx.textAlign = 'left'
  }

  return {
    draw,
  }
}
