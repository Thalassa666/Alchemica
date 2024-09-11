import IconEqualImgSrc from '@assets/images/icon-equal.png'
import IconPlusImgSrc from '@assets/images/icon-plus.png'
import { CraftTools } from '@game/constants/craftTools'
import { IngredientsMap } from '@game/constants/ingredients'
import { PotionsMap } from '@game/constants/potions'
import { receiptToItem } from '@game/helpers/receiptToItem'
import { Receipts, ReceptBookDialog } from '../constants/receipts'
import {
  CanvasContext,
  CraftTool,
  FullLocation,
  InventoryItem,
  Position,
  Receipt,
} from '../types/types'
import { useGameState } from './useGameState'
import { BackgroundOptions, useImage } from './useImage'

/** Использовать книгу рецептов (комбинации справа в зависимости от выбранного рецепта) */
export const useReceiptsBookComboList = () => {
  const { getReceiptBook } = useGameState()
  const image = useImage()

  /** Отрисовать список (справа) необходимого для изготовления выбранного рецепта */
  const drawComboList = (context: CanvasContext) => {
    const selectedReceipt = getReceiptBook().selected
    const item = selectedReceipt ? receiptToItem(selectedReceipt) : null
    const tool = selectedReceipt ? CraftTools[selectedReceipt.tool] : null

    if (!item || !selectedReceipt || !tool) {
      return
    }

    /* Замыкаем, т.к. дальше строки могут формироваться рекурсивно */
    let rowIndex = -1

    const registerRowIndex = (): number => {
      rowIndex++
      return rowIndex
    }

    drawReceiptRow(context, item, selectedReceipt, tool, registerRowIndex)
  }

  /* Отрисовать знак плюс "+" */
  const drawPlus = (context: CanvasContext, position: Position) => {
    const iconOptions: BackgroundOptions = {
      src: IconPlusImgSrc,
      position: { x: position.x, y: position.y },
      size: ReceptBookDialog.comboList.iconSign,
    }

    image.draw(context, iconOptions)
  }

  /* Отрисовать знак равно "=" */
  const drawEqual = (context: CanvasContext, position: Position) => {
    const iconOptions: BackgroundOptions = {
      src: IconEqualImgSrc,
      position: { x: position.x, y: position.y },
      size: ReceptBookDialog.comboList.iconSign,
    }

    image.draw(context, iconOptions)
  }

  /** Отрисовать 1 строку рецепта */
  const drawReceiptRow = (
    context: CanvasContext,
    item: InventoryItem,
    receipt: Receipt,
    tool: CraftTool,
    registerRowIndex: () => number
  ) => {
    const rowIndex = registerRowIndex()

    /* Отступ для знаков равно "=" или плюс "+" */
    const signOffsetX = ReceptBookDialog.comboList.iconSign.width / 2
    const signOffsetY = ReceptBookDialog.comboList.iconSign.height / 2

    /* Сначала отрисовка иконки/текста того, что получится в рецепте */
    const receiptIconPos = {
      x: ReceptBookDialog.comboList.position.x,
      y:
        ReceptBookDialog.comboList.position.y -
        ReceptBookDialog.comboList.icon.height / 2 +
        rowIndex * ReceptBookDialog.comboList.gap.y,
    }

    const receiptLoc = drawReceiptTextIcon(
      context,
      item.label,
      item.imgSrc,
      receiptIconPos
    )

    /* Отрисовка знака равно "=" */
    drawEqual(context, {
      x: receiptLoc.x + receiptLoc.width + signOffsetX,
      y: receiptLoc.y + ReceptBookDialog.comboList.icon.height - signOffsetY,
    })

    /* Отрисовка инструмента, с которого получается этот рецепт */
    const toolLoc = drawReceiptTextIcon(context, tool.label, tool.imgSrc, {
      x: receiptIconPos.x + ReceptBookDialog.comboList.gap.x,
      y: receiptIconPos.y,
    })

    /* После инструмента знак плюс "+" */
    drawPlus(context, {
      x: toolLoc.x + toolLoc.width + signOffsetX,
      y: toolLoc.y + ReceptBookDialog.comboList.icon.height - signOffsetY,
    })

    /* 
      Далее в зависимости от ингредиентов, которые требуются для рецепта:
      - если у ингредиента нет своего рецепта, то просто вставляется справа
      - если он составной и есть свой рецепт, то справа + отрисуется ещё 1 строка для этого рецепта 
    */
    receipt.ingredientNames.forEach((name, index, array) => {
      const ingredient = IngredientsMap[name] ?? PotionsMap[name]
      const receipt = Receipts[name]
      const tool = receipt ? CraftTools[receipt.tool] : null
      const isLast = index === array.length - 1

      const ingredientLoc = drawReceiptTextIcon(
        context,
        ingredient.label,
        ingredient.imgSrc,
        {
          x: toolLoc.x + ReceptBookDialog.comboList.gap.x * (index + 1),
          y: receiptIconPos.y,
        }
      )

      /* Между ингредиентами так же будет проставляться знак плюс "+", кроме последнего */
      if (!isLast) {
        drawPlus(context, {
          x: ingredientLoc.x + ingredientLoc.width + signOffsetX,
          y:
            ingredientLoc.y +
            ReceptBookDialog.comboList.icon.height -
            signOffsetY,
        })
      }

      if (ingredient && receipt && tool) {
        drawReceiptRow(context, ingredient, receipt, tool, registerRowIndex)
      }
    })
  }

  /* Отрисовать иконку с текстом под ним */
  const drawReceiptTextIcon = (
    context: CanvasContext,
    text: string,
    imgSrc: string,
    iconPos: Position
  ): FullLocation => {
    /* Иконка */
    const iconOptions: BackgroundOptions = {
      src: imgSrc,
      position: {
        x: iconPos.x,
        y: iconPos.y - ReceptBookDialog.comboList.icon.height / 2,
      },
      size: ReceptBookDialog.comboList.icon,
    }

    image.draw(context, iconOptions)

    /* Текст (разделяется пробелами и каждое слово переносится) */
    const subTexts = text.split(' ')

    const drawSubText = (text: string, index: number) => {
      const textPosition = {
        x: iconOptions.position.x + iconOptions.size.width / 2,
        y:
          iconOptions.position.y +
          iconOptions.size.height +
          ReceptBookDialog.comboList.font.subTextGap +
          index * ReceptBookDialog.comboList.font.subTextGap,
      }

      context.ctx.fillText(text, textPosition.x, textPosition.y)
    }

    context.ctx.fillStyle = ReceptBookDialog.comboList.font.color
    context.ctx.font = `${ReceptBookDialog.comboList.font.size}px serif`
    context.ctx.textAlign = 'center'

    subTexts.forEach((subText, index) => {
      drawSubText(subText, index)
    })

    context.ctx.fillStyle = 'transparent'
    context.ctx.textAlign = 'left'

    return {
      x: iconOptions.position.x,
      y: iconOptions.position.y,
      width: iconOptions.size.width,
      height: iconOptions.size.height,
    }
  }

  return { drawComboList }
}
