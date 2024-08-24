import { InventoryItem } from 'game/types/types'
import IngredientNameFirst from '/level-background.jpg'
import IngredientNameSecond from '/craft-tool-craft-table-background.png'

const IngredientNames = {
  First: 'First',
  Second: 'Second',
  Third: 'Third',
  Fourth: 'Fourth',
  Fifth: 'Long long long Fifth',
}

export const IngredientsMap: Record<
  typeof IngredientNames[keyof typeof IngredientNames],
  InventoryItem
> = {
  [IngredientNames.First]: {
    name: IngredientNames.First,
    imgSrc: IngredientNameFirst,
  },
  [IngredientNames.Second]: {
    name: IngredientNames.Second,
    imgSrc: IngredientNameSecond,
  },
  [IngredientNames.Third]: {
    name: IngredientNames.Third,
    imgSrc: IngredientNameFirst,
  },
  [IngredientNames.Fourth]: {
    name: IngredientNames.Fourth,
    imgSrc: IngredientNameSecond,
  },
  [IngredientNames.Fifth]: {
    name: IngredientNames.Fifth,
    imgSrc: IngredientNameFirst,
  },
}
