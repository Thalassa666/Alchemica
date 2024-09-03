import { InventoryItem } from '../types/types'
import { labelDefaultCondition } from '../helpers/labelDefaultCondition'
import { ConditionNames } from './conditions'
import { CraftType } from './craftTools'

import HollyImgSrc from '@assets/images/icon-in-progress.png'
import HollyDryImgSrc from '@assets/images/icon-in-progress.png'
import HollyCutImgSrc from '@assets/images/icon-in-progress.png'

import WinterKissImgSrc from '@assets/images/icon-in-progress.png'
import WinterKissDryImgSrc from '@assets/images/icon-in-progress.png'
import WinterKissCutImgSrc from '@assets/images/icon-in-progress.png'

import BibberbangImgSrc from '@assets/images/icon-in-progress.png'
import BibberbangDryImgSrc from '@assets/images/icon-in-progress.png'
import BibberbangCutImgSrc from '@assets/images/icon-in-progress.png'

import NightshadeImgSrc from '@assets/images/icon-in-progress.png'
import NightshadeDryImgSrc from '@assets/images/icon-in-progress.png'
import NightshadeCutImgSrc from '@assets/images/icon-in-progress.png'

import BlessedThistleImgSrc from '@assets/images/icon-in-progress.png'
import BlessedThistleDryImgSrc from '@assets/images/icon-in-progress.png'
import BlessedThistleCutImgSrc from '@assets/images/icon-in-progress.png'

/** Названия ингредиентов */
export const IngredientNames = {
  Holly: 'Holly',
  HollyDry: 'HollyDry',
  HollyCut: 'HollyCut',
  WinterKiss: 'WinterKiss',
  WinterKissDry: 'WinterKissDry',
  WinterKissCut: 'WinterKissCut',
  Bibberbang: 'Bibberbang',
  BibberbangDry: 'BibberbangDry',
  BibberbangCut: 'BibberbangCut',
  Nightshade: 'Nightshade',
  NightshadeDry: 'NightshadeDry',
  NightshadeCut: 'NightshadeCut',
  BlessedThistle: 'BlessedThistle',
  BlessedThistleDry: 'BlessedThistleDry',
  BlessedThistleCut: 'BlessedThistleCut',
}

/** Конфигурация ингредиентов */
export const IngredientsMap: Record<
  typeof IngredientNames[keyof typeof IngredientNames],
  InventoryItem
> = {
  /* ----- */
  [IngredientNames.Holly]: {
    key: IngredientNames.Holly,
    condition: ConditionNames.Raw,
    imgSrc: HollyImgSrc,
    label: 'Остролист',
    type: CraftType.Ingredient,
  },
  [IngredientNames.HollyDry]: {
    key: IngredientNames.HollyDry,
    condition: ConditionNames.Dry,
    imgSrc: HollyDryImgSrc,
    label: labelDefaultCondition(ConditionNames.Dry, 'Остролист'),
    type: CraftType.Ingredient,
  },
  [IngredientNames.HollyCut]: {
    key: IngredientNames.HollyCut,
    condition: ConditionNames.Cut,
    imgSrc: HollyCutImgSrc,
    label: labelDefaultCondition(ConditionNames.Cut, 'Остролист'),
    type: CraftType.Ingredient,
  },

  /* ----- */
  [IngredientNames.WinterKiss]: {
    key: IngredientNames.WinterKiss,
    condition: ConditionNames.Raw,
    imgSrc: WinterKissImgSrc,
    label: 'Поцелуй зимы',
    type: CraftType.Ingredient,
  },
  [IngredientNames.WinterKissDry]: {
    key: IngredientNames.WinterKissDry,
    condition: ConditionNames.Dry,
    imgSrc: WinterKissDryImgSrc,
    label: labelDefaultCondition(ConditionNames.Dry, 'Поцелуй зимы'),
    type: CraftType.Ingredient,
  },
  [IngredientNames.WinterKissCut]: {
    key: IngredientNames.WinterKissCut,
    condition: ConditionNames.Cut,
    imgSrc: WinterKissCutImgSrc,
    label: labelDefaultCondition(ConditionNames.Cut, 'Поцелуй зимы'),
    type: CraftType.Ingredient,
  },

  /* ----- */
  [IngredientNames.Bibberbang]: {
    key: IngredientNames.Bibberbang,
    condition: ConditionNames.Raw,
    imgSrc: BibberbangImgSrc,
    label: 'Бибербанг',
    type: CraftType.Ingredient,
  },
  [IngredientNames.BibberbangDry]: {
    key: IngredientNames.BibberbangDry,
    condition: ConditionNames.Dry,
    imgSrc: BibberbangDryImgSrc,
    label: labelDefaultCondition(ConditionNames.Dry, 'Бибербанг'),
    type: CraftType.Ingredient,
  },
  [IngredientNames.BibberbangCut]: {
    key: IngredientNames.BibberbangCut,
    condition: ConditionNames.Cut,
    imgSrc: BibberbangCutImgSrc,
    label: labelDefaultCondition(ConditionNames.Cut, 'Бибербанг'),
    type: CraftType.Ingredient,
  },

  /* ----- */
  [IngredientNames.Nightshade]: {
    key: IngredientNames.Nightshade,
    condition: ConditionNames.Raw,
    imgSrc: NightshadeImgSrc,
    label: 'Паслён',
    type: CraftType.Ingredient,
  },
  [IngredientNames.NightshadeDry]: {
    key: IngredientNames.NightshadeDry,
    condition: ConditionNames.Dry,
    imgSrc: NightshadeDryImgSrc,
    label: labelDefaultCondition(ConditionNames.Dry, 'Паслён'),
    type: CraftType.Ingredient,
  },
  [IngredientNames.NightshadeCut]: {
    key: IngredientNames.NightshadeCut,
    condition: ConditionNames.Cut,
    imgSrc: NightshadeCutImgSrc,
    label: labelDefaultCondition(ConditionNames.Cut, 'Паслён'),
    type: CraftType.Ingredient,
  },

  /* ----- */
  [IngredientNames.BlessedThistle]: {
    key: IngredientNames.BlessedThistle,
    condition: ConditionNames.Raw,
    imgSrc: BlessedThistleImgSrc,
    label: 'Кникус',
    type: CraftType.Ingredient,
  },
  [IngredientNames.BlessedThistleDry]: {
    key: IngredientNames.BlessedThistleDry,
    condition: ConditionNames.Dry,
    imgSrc: BlessedThistleDryImgSrc,
    label: labelDefaultCondition(ConditionNames.Dry, 'Кникус'),
    type: CraftType.Ingredient,
  },

  [IngredientNames.BlessedThistleCut]: {
    key: IngredientNames.BlessedThistleCut,
    condition: ConditionNames.Cut,
    imgSrc: BlessedThistleCutImgSrc,
    label: labelDefaultCondition(ConditionNames.Cut, 'Кникус'),
    type: CraftType.Ingredient,
  },
}