import SpeedImgSrc from '@assets/images/icons/potion1-pic.png'
import StrengthImgSrc from '@assets/images/icons/potion2-pic.png'
import WisdomImgSrc from '@assets/images/icons/potion3-pic.png'
import { InventoryItem } from '../types/types'
import { ConditionNames } from './conditions'
import { CraftType } from './craftTools'

/** Названия зелий */
export const PotionNames = {
  Speed: 'Speed',
  Strength: 'Strength',
  Wisdom: 'Wisdom',
} as const

/** Конфигурация зелий */
export const PotionsMap: Record<string, InventoryItem> = {
  [PotionNames.Speed]: {
    key: PotionNames.Speed,
    label: 'Зелье скорости',
    imgSrc: SpeedImgSrc,
    condition: ConditionNames.Raw,
    type: CraftType.Potion,
  },
  [PotionNames.Strength]: {
    key: PotionNames.Strength,
    label: 'Зелье силы',
    imgSrc: StrengthImgSrc,
    condition: ConditionNames.Raw,
    type: CraftType.Potion,
  },
  [PotionNames.Wisdom]: {
    key: PotionNames.Wisdom,
    label: 'Зелье мудрости',
    imgSrc: WisdomImgSrc,
    condition: ConditionNames.Raw,
    type: CraftType.Potion,
  },
}
