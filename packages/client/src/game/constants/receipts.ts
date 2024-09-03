import { InventoryItem, Receipt } from '../types/types'
import { ConditionNames } from './conditions'
import { CraftToolNames, CraftType } from './craftTools'
import { IngredientNames } from './ingredients'
import { PotionNames } from './potions'
import BadReceiptIngredientImgSrc from '@assets/images/icon-in-progress.png'

/** Конфигурация рецептов */
export const Receipts: Record<string, Receipt> = {
  [IngredientNames.HollyDry]: {
    key: IngredientNames.HollyDry,
    tool: CraftToolNames.FirePot,
    type: CraftType.Ingredient,
    ingredientNames: [IngredientNames.Holly],
  },
  [IngredientNames.HollyCut]: {
    key: IngredientNames.HollyCut,
    tool: CraftToolNames.CraftTable,
    type: CraftType.Ingredient,
    ingredientNames: [IngredientNames.Holly],
  },
  [PotionNames.Speed]: {
    key: PotionNames.Speed,
    tool: CraftToolNames.Mixing,
    type: CraftType.Potion,
    ingredientNames: [
      IngredientNames.HollyDry,
      IngredientNames.HollyCut,
      IngredientNames.WinterKiss,
    ],
  },
  [PotionNames.Strength]: {
    key: PotionNames.Strength,
    tool: CraftToolNames.Mixing,
    type: CraftType.Potion,
    ingredientNames: [
      IngredientNames.Bibberbang,
      IngredientNames.Bibberbang,
      IngredientNames.Bibberbang,
    ],
  },
  [PotionNames.Wisdom]: {
    key: PotionNames.Wisdom,
    tool: CraftToolNames.Mixing,
    type: CraftType.Potion,
    ingredientNames: [
      IngredientNames.WinterKiss,
      IngredientNames.WinterKiss,
      IngredientNames.WinterKiss,
    ],
  },
}

/** Результат по умолчанию, если рецепт не удался */
export const BadReceiptIngredient: InventoryItem = {
  key: 'BadReceiptIngredient',
  imgSrc: BadReceiptIngredientImgSrc,
  type: CraftType.Wasted,
  condition: ConditionNames.Raw,
  label: 'Потрачено',
}
