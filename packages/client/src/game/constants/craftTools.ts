import { CollisionMap, CraftTool } from '../types/types'
import CraftTableBackgroundSrc from '/craft-tool-craft-table-background.png'

export const CraftToolNames = {
  FirePot: 'FirePot',
  CraftTable: 'CraftTable',
  Pot: 'Pot',
} as const

// TODO: Добавить иконки
export const CraftToolsBackgrounds = {
  [CraftToolNames.FirePot]: '',
  [CraftToolNames.CraftTable]: CraftTableBackgroundSrc,
  [CraftToolNames.Pot]: '',
} as const

export const CraftToolsComboCount = {
  [CraftToolNames.FirePot]: 1,
  [CraftToolNames.CraftTable]: 1,
  [CraftToolNames.Pot]: 3,
} as const

export const CraftTools: CollisionMap<CraftTool> = {
  [CraftToolNames.FirePot]: {
    x: 215,
    y: 350,
    width: 100,
    height: 330,
    name: CraftToolNames.FirePot,
  },
  [CraftToolNames.CraftTable]: {
    x: 640,
    y: 350,
    width: 100,
    height: 330,
    name: CraftToolNames.CraftTable,
  },
  [CraftToolNames.Pot]: {
    x: 1040,
    y: 350,
    width: 100,
    height: 330,
    name: CraftToolNames.Pot,
  },
}

export const CraftToolsComboCounts: Record<
  keyof typeof CraftToolNames,
  number
> = {
  [CraftToolNames.FirePot]: 1,
  [CraftToolNames.CraftTable]: 1,
  [CraftToolNames.Pot]: 3,
}

export const CraftDialogSizes = {
  /** Ширина модального окна */
  DialogWidth: 1024,
  /** Высота модального окна */
  DialogHeight: 576,

  /** Отступы оверлея от краев модального окна */
  OverlayPadding: 15,
  /** Отступы контента от краев оверлея */
  ContentPadding: 25,

  /** Высота ленты выбора ингридиентов */
  IngredientsPickHeight: 150,
  /** Максимальное кол-во ингридиентов для выбора на отображение (пагинация) */
  MaxElements: 5,

  /** Высота иконки ингридиента в ленте */
  PickIconHeight: 70,
  /** Длина иконки ингридиента в ленте */
  PickIconWidth: 70,

  /** Высота иконки ингридиента в ленте (активный - центральный) */
  PickIconHeightCentered: 90,
  /** Длина иконки ингридиента в ленте (активный - центральный) */
  PickIconWidthCentered: 90,
  /** Размер шрифта ингридиента в ленте (активный - центральный)  */
  PickFontSizeCentered: 22,
  /** Цвет шрифта ингридиента в ленте (активный - центральный)  */
  PickFontColorCentered: 'white',

  /** Ширина квадрата комбинирования предметов */
  ComboSquareWidth: 100,
  /** Высота квадрата комбинирования предметов */
  ComboSquareHeight: 100,
  /** Отступ между квадратами комбинирования предметов по строке */
  ComboRowOffset: 80,
  /** Отступ между квадратами комбинирования предметов по колонке */
  ComboColumnOffset: 100,

  /** Размер шрифта ингридиента для комбо ингридиентов */
  ComboFontSizeCentered: 17,
  /** Размер шрифта ингридиента для комбо ингридиентов */
  ComboFontColorCentered: 'white',
}
