import {
  CraftDialogSizes,
  CraftToolsBackgrounds,
  CraftToolsComboCount,
} from '../constants/craftTools'
import { useGameState } from './useGameState'
import { CanvasContext, CraftTool, Position, Size } from '../types/types'
import { BackgroundOptions, useBackground } from './useBackground'
import { EvtKeys } from '../constants/misc'
import { useWindowEffect } from '../../hooks/useWindowEffect'
import { useIngredientsCarousel } from './useIngredientsCarousel'
import { useIngredientsCombo } from './useIngredientsCombo'

const getBackgroundPosition = (context: CanvasContext): Position => {
  return {
    x: context.canvas.width / 2 - CraftDialogSizes.DialogWidth / 2,
    y: context.canvas.height / 2 - CraftDialogSizes.DialogHeight / 2,
  }
}

const getBackgroundSize = (): Size => {
  return {
    width: CraftDialogSizes.DialogWidth,
    height: CraftDialogSizes.DialogHeight,
  }
}

/** Использовать модальное окно для крафта предметов */
export const useCraftDialog = () => {
  const {
    getCraftTools,
    updateCraftTools,
    setCanPlayerMove,
    getInventory,
    updateInventory,
  } = useGameState()

  const background = useBackground()
  const ingredientsCombo = useIngredientsCombo()
  const ingredientsPick = useIngredientsCarousel()

  /** Открыть модальное окно, если было взаимодействие с интерактивным объектом */
  const draw = (context: CanvasContext) => {
    const craftTool = getCraftTools().active

    if (!craftTool) {
      return
    }

    openDialog(context, craftTool)
  }

  /** Отрисовать изображение в качестве заднего фона в зависимости от выбранного инструмента */
  const drawBackground = (context: CanvasContext, craftTool: CraftTool) => {
    const position = getBackgroundPosition(context)
    const size = getBackgroundSize()

    const backgroundOptions: BackgroundOptions = {
      src: CraftToolsBackgrounds[
        craftTool.name as keyof typeof CraftToolsBackgrounds
      ],
      position,
      size,
    }

    background.drawOverlayFullSize(context)
    background.draw(context, backgroundOptions)
    background.drawOverlayByLocation(
      context,
      { ...position, ...size },
      CraftDialogSizes.OverlayPadding * -1
    )
  }

  const createSelected = () => {
    const craftTool = getCraftTools().active

    if (!craftTool) {
      return []
    }

    const comboCount =
      CraftToolsComboCount[
        craftTool.name as keyof typeof CraftToolsComboCount
      ] ?? 1

    return Array.from({ length: comboCount }, () => null)
  }

  /** Открыть модальное окно и установить все необходимые значения */
  const openDialog = (context: CanvasContext, craftTool: CraftTool) => {
    const isPicking = getInventory().isPicking

    const dialogLocation = {
      ...getBackgroundPosition(context),
      ...getBackgroundSize(),
    }

    setCanPlayerMove(false)

    /* В момент открытия модального окна - устанавливается возможность выбрать 1 или несколько комбо ингридиентов */

    if (!isPicking) {
      const selected = createSelected()

      updateInventory({ isPicking: true, selected })
    }

    drawBackground(context, craftTool)
    ingredientsCombo.draw(context, dialogLocation)
    ingredientsPick.draw(context, dialogLocation)
  }

  /** Закрыть модальное окно и сбросить все необходимые значения */
  const closeDialog = () => {
    updateCraftTools({ active: null })
    setCanPlayerMove(true)
    updateInventory({ isPicking: false, selectingIndex: 0, selected: [null] })
  }

  /** Сбросить модальное окно на начальные значения, но не закрывать */
  const resetDialog = () => {
    const selected = createSelected()

    updateInventory({ selected })
  }

  /* Выбрать (заменить null у selected) отцентрированный элемент карусели */
  const pickItem = () => {
    const currentSelected = getInventory().selected
    const centeredItem = getInventory().all[getInventory().selectingIndex]
    const swapIndex = currentSelected.findIndex(item => !item)

    if (swapIndex < 0) {
      return
    }

    const updatedSelected = currentSelected.map((item, index) =>
      index === swapIndex ? centeredItem : item
    )

    updateInventory({ selected: updatedSelected })
  }

  /* Создать получаемый элемент (ингридиент/зелье) */
  const craftElement = () => {
    //
  }

  const handleKeydown = (evt: KeyboardEvent) => {
    if (!getCraftTools().active) {
      return
    }

    /* Все слоты выбраны */
    const isFilled = getInventory().selected.every(item => item)

    /* Если слоты выбраны, то сбросит их. Иначе закроет модальное окно */
    if (evt.key === EvtKeys.Esc) {
      if (isFilled) {
        resetDialog()
      } else {
        closeDialog()
      }
    }

    /* Если слоты выбраны, то скрафтит элемент. Иначе выберет ингридиент для крафта */
    if (evt.key === EvtKeys.Enter) {
      if (isFilled) {
        craftElement()
      } else {
        pickItem()
      }
    }
  }

  useWindowEffect('keydown', handleKeydown)

  return { draw }
}
