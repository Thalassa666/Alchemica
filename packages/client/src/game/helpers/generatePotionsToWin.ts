import { Game } from '@game/constants/misc'
import { PotionReceipts } from '@game/constants/receipts'
import { InventoryItem } from '@game/types/types'
import { receiptToItem } from './receiptToItem'

const Potions = Object.values(PotionReceipts)

/** Срандомизировать зелья, необходимые для победы */
export const generatePotionsToWin = (): InventoryItem[] => {
  const result: InventoryItem[] = []
  let loopMaxCount = Game.PotionsToWin <= 100 ? 100 : Game.PotionsToWin

  /* Функция генерирует уникальные значения. Если нужны неуникальные, то поменять структуру с объекта на массив */
  if (!Potions.length) {
    throw new Error(
      `Проверьте настройки рецептов в PotionReceipts. На текущий момент нет рецептов для победы.`
    )
  }

  while (
    Object.keys(result).length !== Game.PotionsToWin &&
    loopMaxCount !== 0
  ) {
    const randomIndex = Math.floor(Math.random() * Potions.length)

    const randomReceipt = Potions[randomIndex]
    const randomItem = receiptToItem(randomReceipt)

    if (randomItem) {
      result.push(randomItem)
    }

    loopMaxCount--
  }

  return result
}
