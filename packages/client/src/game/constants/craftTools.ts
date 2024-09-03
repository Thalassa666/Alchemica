import { CraftTool } from '../types/types'
import { ConditionNames } from './conditions'
import FirePotImgSrc from '@assets/images/icon-in-progress.png'
import CraftTableImgSrc from '@assets/images/icon-in-progress.png'
import MixingImgSrc from '@assets/images/icon-in-progress.png'

/** Названия крафт инструментов */
export const CraftToolNames = {
  FirePot: 'FirePot',
  CraftTable: 'CraftTable',
  Mixing: 'Mixing',
} as const

/** Виды получаемых от крафта предметов */
export const CraftType = {
  Ingredient: 'Ingredient',
  Potion: 'Potion',
  Wasted: 'Wasted',
} as const

/** Конфигурация крафт инструментов */
export const CraftTools: Record<
  typeof CraftToolNames[keyof typeof CraftToolNames],
  CraftTool
> = {
  [CraftToolNames.FirePot]: {
    key: CraftToolNames.FirePot,
    label: 'Жаровня',
    imgSrc: FirePotImgSrc,
    comboCount: 1,
    collision: {
      name: CraftToolNames.FirePot,
      x: 215,
      y: 350,
      width: 100,
      height: 330,
    },
    toConditions: {
      [ConditionNames.Dry]: true,
    },
  },
  [CraftToolNames.CraftTable]: {
    key: CraftToolNames.CraftTable,
    label: 'Ремесленный стол',
    imgSrc: CraftTableImgSrc,
    comboCount: 1,
    collision: {
      x: 640,
      y: 350,
      width: 100,
      height: 330,
      name: CraftToolNames.CraftTable,
    },
    toConditions: {
      [ConditionNames.Cut]: true,
    },
  },
  [CraftToolNames.Mixing]: {
    key: CraftToolNames.Mixing,
    label: 'Смешивание',
    imgSrc: MixingImgSrc,
    comboCount: 3,
    collision: {
      x: 1040,
      y: 350,
      width: 100,
      height: 330,
      name: CraftToolNames.Mixing,
    },
    toConditions: {
      [ConditionNames.Raw]: true, // Создаёт новый предмет - зелье
    },
  },
}

/** Конфигурация модального окна при взаимодействии с крафт инструментом */
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
}
