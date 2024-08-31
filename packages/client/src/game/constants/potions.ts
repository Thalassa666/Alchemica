import { InventoryItem } from '../types/types'
import { ConditionNames } from './conditions'

import SpeedImgSrc from '/icon-in-progress.png'
import StrengthImgSrc from '/icon-in-progress.png'

export const PotionNames = {
  Speed: 'Speed',
  Strength: 'Strength',
} as const

export const PotionsMap: Record<
  typeof PotionNames[keyof typeof PotionNames],
  InventoryItem
> = {
  [PotionNames.Speed]: {
    key: PotionNames.Speed,
    label: 'Зелье скорости',
    imgSrc: SpeedImgSrc,
    condition: ConditionNames.Raw,
    type: 'potion',
  },
  [PotionNames.Strength]: {
    key: PotionNames.Strength,
    label: 'Зелье силы',
    imgSrc: StrengthImgSrc,
    condition: ConditionNames.Raw,
    type: 'potion',
  },
}
