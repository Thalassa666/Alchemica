import { InventoryItem, Receipt } from '../types/types'
import { ConditionNames } from './conditions'
import { CraftToolNames } from './craftTools'
import { IngredientNames } from './ingredients'
import BadReceiptIngredientImgSrc from '/icon-in-progress.png'

export const Receipts: Record<string, Receipt> = {
  [IngredientNames.HollyDry]: {
    key: IngredientNames.HollyDry,
    tool: CraftToolNames.FirePot,
    ingredientNames: [IngredientNames.Holly],
  },
  [IngredientNames.HollyCut]: {
    key: IngredientNames.HollyCut,
    tool: CraftToolNames.CraftTable,
    ingredientNames: [IngredientNames.Holly],
  },
}

export const BadReceiptIngredient: InventoryItem = {
  key: 'BadReceiptIngredient',
  imgSrc: BadReceiptIngredientImgSrc,
  type: 'ingredient',
  condition: ConditionNames.Raw,
  label: 'Потрачено',
}
