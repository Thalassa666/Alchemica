import { Conditions } from '../constants/conditions'
import { ConditionType } from '../types/types'

/** Добавить стандартное описание для переданного вида агрегатного состояния */
export const labelDefaultCondition = (type: ConditionType, prefix: string) => {
  const label = Conditions[type].label

  return label ? `${prefix} (${label.toLowerCase()})` : prefix
}
