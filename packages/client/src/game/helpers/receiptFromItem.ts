import { arrayToMapObject, groupArray } from '@core/helpers'
import { Receipts } from '../constants/receipts'
import { CraftTool, InventoryItem, Receipt } from '../types/types'

const ReceiptsByTools = groupArray(
  Object.values(Receipts),
  receipt => receipt.tool
)

/** Получить рецепт от переданного предмета */
export const receiptFromItem = (
  craftTool: CraftTool,
  selected: (InventoryItem | null)[]
): Receipt | undefined => {
  const receipts = ReceiptsByTools[craftTool.key]
  const selectedMap = arrayToMapObject(selected, item => item?.key ?? 'empty')

  return receipts?.find(receipt =>
    receipt.ingredientNames.every(ingredient => selectedMap[ingredient])
  )
}
