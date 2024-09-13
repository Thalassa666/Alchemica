import BadReceiptIngredientImgSrc from '@assets/images/icon-in-progress.png'
import { InventoryItem, Receipt } from '../types/types'
import { ConditionNames } from './conditions'
import { CraftToolNames, CraftType } from './craftTools'
import { IngredientNames } from './ingredients'
import { Game, GameColors } from './misc'
import { PotionNames } from './potions'

/** Конфигурация рецептов зелий */
export const PotionReceipts: Record<string, Receipt> = {
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

/** Конфигурация рецептов ингредиентов */
export const IngredientReceipts: Record<string, Receipt> = {
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
  [IngredientNames.WinterKissDry]: {
    key: IngredientNames.WinterKissDry,
    tool: CraftToolNames.FirePot,
    type: CraftType.Ingredient,
    ingredientNames: [IngredientNames.WinterKiss],
  },
  [IngredientNames.WinterKissCut]: {
    key: IngredientNames.WinterKissCut,
    tool: CraftToolNames.CraftTable,
    type: CraftType.Ingredient,
    ingredientNames: [IngredientNames.WinterKiss],
  },
  [IngredientNames.BibberbangDry]: {
    key: IngredientNames.BibberbangDry,
    tool: CraftToolNames.FirePot,
    type: CraftType.Ingredient,
    ingredientNames: [IngredientNames.Bibberbang],
  },
  [IngredientNames.BibberbangCut]: {
    key: IngredientNames.BibberbangCut,
    tool: CraftToolNames.CraftTable,
    type: CraftType.Ingredient,
    ingredientNames: [IngredientNames.Bibberbang],
  },
  [IngredientNames.NightshadeDry]: {
    key: IngredientNames.NightshadeDry,
    tool: CraftToolNames.FirePot,
    type: CraftType.Ingredient,
    ingredientNames: [IngredientNames.Nightshade],
  },
  [IngredientNames.NightshadeCut]: {
    key: IngredientNames.NightshadeCut,
    tool: CraftToolNames.CraftTable,
    type: CraftType.Ingredient,
    ingredientNames: [IngredientNames.Nightshade],
  },
  [IngredientNames.BlessedThistleDry]: {
    key: IngredientNames.BlessedThistleDry,
    tool: CraftToolNames.FirePot,
    type: CraftType.Ingredient,
    ingredientNames: [IngredientNames.BlessedThistle],
  },
  [IngredientNames.BlessedThistleCut]: {
    key: IngredientNames.BlessedThistleCut,
    tool: CraftToolNames.CraftTable,
    type: CraftType.Ingredient,
    ingredientNames: [IngredientNames.BlessedThistle],
  },
}

/** Конфигурация рецептов */
export const Receipts: Record<string, Receipt> = {
  ...PotionReceipts,
  ...IngredientReceipts,
}

/** Результат по умолчанию, если рецепт не удался */
export const BadReceiptIngredient: InventoryItem = {
  key: 'BadReceiptIngredient',
  imgSrc: BadReceiptIngredientImgSrc,
  type: CraftType.Wasted,
  condition: ConditionNames.Raw,
  label: 'Испорченное месиво',
}

const DialogHeight = 576
const DialogBackgroundY = Game.Size.height / 2 - DialogHeight / 2

/** Конфигурация модального окна журнала рецептов */
export const ReceptBookDialog = {
  size: { width: 1024, height: DialogHeight },
  getPosition: function getPosition() {
    return {
      x: Game.Size.width / 2 - this.size.width / 2,
      y: DialogBackgroundY,
    }
  },

  /* Список рецептов и элементы "слева" */
  receiptsList: {
    position: { x: 275, y: 210 },
    gap: { x: 15, y: 55 },
    icon: { width: 50, height: 50 },
    font: {
      size: 20,
      color: GameColors.TextColorBlack,
      hoverColor: GameColors.TextColorRed,
      activeColor: GameColors.TextColorRed,
    },
    clickableAreaWidth: 300,
  },

  /* Список комбинаций и элементы "справа" */
  comboList: {
    position: { x: 670, y: 210 },
    icon: { width: 45, height: 45 },
    iconSign: { width: 20, height: 10 },
    gap: { x: 85, y: 80 },
    font: {
      color: GameColors.TextColorBlack,
      size: 12,
      subTextGap: 10,
    },
  },

  /* Пагинация */
  pagination: {
    sizePerPage: 6,
    font: {
      size: 27,
      color: GameColors.TextColorBlack,
    },
    iconArrow: { width: 50, height: 50, gap: 50 },
    position: {
      x: 535,
      y: DialogBackgroundY + DialogHeight - 75,
    },
  },
}
