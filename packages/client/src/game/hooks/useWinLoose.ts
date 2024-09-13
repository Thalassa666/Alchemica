import { CraftType } from '@game/constants/craftTools'
import { Game } from '@game/constants/misc'
import { generatePotionsToWin } from '@game/helpers/generatePotionsToWin'
import { GameStep, InventoryItem } from '@game/types/types'
import { useGameState } from './useGameState'
import { useNotifications } from './useNotifications'

export const useWinLoose = () => {
  const { getStatistic, updateStatistic } = useGameState()
  const notification = useNotifications()

  /** Начало игры */
  const initWinCondition = () => {
    const startedAt = performance.now()
    const itemsToWin = generatePotionsToWin()

    updateStatistic({ startedAt, itemsToWin })
  }

  /** Завершение игры */
  const endGame = (step: GameStep) => {
    const startedAdd = getStatistic().startedAt ?? 0
    const endedAt = performance.now()
    const diff = Math.abs(endedAt - startedAdd)
    const coefficient = step === 'won' ? Game.WinK : Game.LooseK
    const totalScore = Math.trunc(diff * coefficient)

    updateStatistic({ endedAt, step, totalScore })
  }

  /** Условие победы */
  const checkForWin = () => {
    const isWon = !getStatistic().itemsToWin.length

    if (isWon) {
      endGame('won')
    }

    return isWon
  }

  /** Условие поражения */
  const checkForLoose = () => {
    const isLost = getStatistic().wastedReceipts >= Game.WastedToLose

    if (isLost) {
      endGame('lost')
    }

    return isLost
  }

  /** Проверка после создания рецепта */
  const afterCraft = (crafted: InventoryItem) => {
    const isWasted = crafted.type === CraftType.Wasted

    const indexToRemove = getStatistic().itemsToWin.findIndex(
      item => crafted.key === item.key
    )

    const isRemovable = indexToRemove >= 0

    if (isRemovable) {
      const updatedItemsToWin = getStatistic().itemsToWin.filter(
        (_item, index) => index !== indexToRemove
      )

      updateStatistic({ itemsToWin: updatedItemsToWin })
    }

    if (isWasted) {
      updateStatistic({ wastedReceipts: getStatistic().wastedReceipts + 1 })
    }

    const isLost = checkForLoose()
    const isWon = checkForWin()

    if (!isLost && !isWon && isWasted) {
      notification.addNotification({
        title: 'Осталось попыток',
        text: `${Game.WastedToLose - getStatistic().wastedReceipts} шт.`,
        imgSrc: '',
      })
    }

    if (!isLost && !isWon && isRemovable) {
      notification.addNotification({
        title: 'Осталось создать',
        text: `${getStatistic().itemsToWin.length} шт.`,
        imgSrc: '',
      })
    }
  }

  return {
    initWinCondition,
    afterCraft,
  }
}