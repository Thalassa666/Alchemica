import { IngredientsMap } from '../constants/ingredients'
import { PotionsMap } from '../constants/potions'
import { BadReceiptIngredient } from '../constants/receipts'
import { InventoryItem, Receipt } from '../types/types'

/** Получить предмет от переданного рецепта */
export const receiptToItem = (
  receipt: Receipt | null | undefined
): InventoryItem | null => {
  if (!receipt) {
    return BadReceiptIngredient
  }

  if (receipt.key in PotionsMap) {
    return PotionsMap[receipt.key as keyof typeof PotionsMap]
  }

  if (receipt.key in IngredientsMap) {
    return IngredientsMap[receipt.key as keyof typeof IngredientsMap]
  }

  return BadReceiptIngredient
}
