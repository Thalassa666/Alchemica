import { EvtCodes } from '@core/utils/constants'
import { Collision } from '../types/types'

/** Конфигурация игры */
export const Game = {
  Size: { width: 1280, height: 720 },
  PotionsToWin: 3,
  WastedToLose: 5,
  WinK: 2,
  LooseK: 0.5,
}

/** Подсвечивать "скрытые" коллизии */
const colorOnDev = (color: string) => {
  const isDev = true

  return isDev ? color : 'transparent'
}

/** Игровые цвета */
export const GameColors = {
  Overlay: '#20222d99',
  TextColor: 'white',
  TextColorBlack: 'black',
  TextColorRed: 'red',
  Notification: '#20222d99',
  Border: colorOnDev('#ff64644d'),
  CraftToolNearPlayer: colorOnDev('lightgoldenrodyellow'),
  CraftToolObject: colorOnDev('#ff64ff4d'),
  MouseInteractionObject: colorOnDev('rgba(0, 255, 0, 0.4)'),
}

/** Конфигурация игровых границ */
export const GameBorders: Collision[] = [
  {
    x: 0,
    y: 0,
    width: 25,
    height: Game.Size.height,
    name: 'Left game zone border',
  },
  {
    x: Game.Size.width - 25,
    y: 0,
    width: 25,
    height: Game.Size.height,
    name: 'Right game zone border',
  },
  {
    x: 0,
    y: 0,
    width: Game.Size.width,
    height: 25,
    name: 'Top game zone border',
  },
  {
    x: 0,
    y: Game.Size.height - 25,
    width: Game.Size.width,
    height: 25,
    name: 'Bottom game zone border',
  },
]

export const GameKeyCodes = {
  MoveLeft: [EvtCodes.ArrowLeft, EvtCodes.A],
  MoveRight: [EvtCodes.ArrowRight, EvtCodes.D],
  PickLeft: [EvtCodes.ArrowLeft, EvtCodes.A],
  PickRight: [EvtCodes.ArrowRight, EvtCodes.D],
  Interact: [EvtCodes.Enter, EvtCodes.Space],
  Exit: [EvtCodes.Esc, EvtCodes.Tab],
  ReceiptsJournal: [EvtCodes.J],
  WinInfo: [EvtCodes.K],
}
