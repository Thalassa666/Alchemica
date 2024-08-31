import { PotionsMap } from '../constants/potions'
import { IngredientsMap } from '../constants/ingredients'
import { BadReceiptIngredient, Receipts } from '../constants/receipts'
import { CraftTool, InventoryItem, Receipt } from '../types/types'

const groupArray = <T = unknown>(
  array: T[],
  accessorFn: (item: T) => string
): Record<string, T[]> => {
  const result: Record<string, T[]> = {}

  array.forEach(item => {
    const accessor = accessorFn(item)

    if (!result[accessor]) {
      result[accessor] = []
    }

    result[accessor].push(item)
  })

  return result
}

const arrayToMapObject = <T = unknown>(
  array: T[],
  accessorFn: (item: T) => string
): Record<string, T> => {
  const result: Record<string, T> = {}

  array.forEach(item => {
    const accessor = accessorFn(item)

    result[accessor] = item
  })

  return result
}

const ReceiptsByTools = groupArray(
  Object.values(Receipts),
  receipt => receipt.tool
)

export const findReceipt = (
  craftTool: CraftTool,
  selected: (InventoryItem | null)[]
): Receipt | undefined => {
  const receipts = ReceiptsByTools[craftTool.key]
  const selectedMap = arrayToMapObject(selected, item => item?.key ?? 'empty')

  return receipts?.find(receipt =>
    receipt.ingredientNames.every(ingredient => selectedMap[ingredient])
  )
}

export const getItemFromReceipt = (
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
