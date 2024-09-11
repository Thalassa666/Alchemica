import { GameKeyCodes } from '@game/constants/misc'

/** Проверить подходит ли событие клавиши под переданное действие */
export const runIfKeyMatch = (
  action: keyof typeof GameKeyCodes,
  evt: KeyboardEvent,
  cb: () => void
) => {
  const isMatch = GameKeyCodes[action]?.includes(evt.code)

  if (isMatch) {
    cb()
  }
}
