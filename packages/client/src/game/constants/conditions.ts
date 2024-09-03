/** Возможные агрегатные состояния предметов */
export const ConditionNames = {
  Raw: 'Raw',
  Cut: 'Cut',
  Dry: 'Dry',
  Broke: 'Broke',
} as const

/** Конфиг возможных состояний предметов */
export const Conditions = {
  [ConditionNames.Raw]: {
    key: ConditionNames.Raw,
    label: 'Сырой',
  },
  [ConditionNames.Cut]: {
    key: ConditionNames.Cut,
    label: 'Измельченный',
  },
  [ConditionNames.Dry]: {
    key: ConditionNames.Dry,
    label: 'Сушенный',
  },
  [ConditionNames.Broke]: {
    key: ConditionNames.Broke,
    label: 'Испорченный',
  },
}
