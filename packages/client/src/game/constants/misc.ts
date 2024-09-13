import KeyAImgSrc from '@assets/images/keyboard/key-a.png'
import KeyDImgSrc from '@assets/images/keyboard/key-d.png'
import KeyEnterImgSrc from '@assets/images/keyboard/key-enter.png'
import KeyEscImgSrc from '@assets/images/keyboard/key-esc.png'
import KeyJImgSrc from '@assets/images/keyboard/key-j.png'
import KeyKImgSrc from '@assets/images/keyboard/key-k.png'
import KeyLImgSrc from '@assets/images/keyboard/key-l.png'
import KeyLeftImSrc from '@assets/images/keyboard/key-left.png'
import KeyQImgSrc from '@assets/images/keyboard/key-q.png'
import KeyRightImSrc from '@assets/images/keyboard/key-right.png'
import KeySpaceImgSrc from '@assets/images/keyboard/key-space.png'
import LMBImgSrc from '@assets/images/keyboard/mouse-left.png'
import { EvtCodes } from '@core/utils/constants'
import { Collision } from '../types/types'

/** Конфигурация игры */
export const Game = {
  Size: { width: 1280, height: 720 },
  PotionsToWin: 3,
  WastedToLose: 5,
  WinK: 2,
  LooseK: 0.5,
  WasteK: 100,
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
  CraftToolNearPlayerText: 'rgba(255, 255, 255, 1)',
  CraftToolObject: colorOnDev('#ff64ff4d'),
  CraftToolObjectText: 'rgba(255, 255, 255, 0.6)',
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
  Exit: [EvtCodes.Esc, EvtCodes.Q],
  ReceiptsJournal: [EvtCodes.J],
  WinInfo: [EvtCodes.K],
  Controls: [EvtCodes.L],
}

export const GameControls = {
  Left: {
    labels: ['Движение влево', 'Выбор предмета слева'],
    keyLabels: ['Arrow Left', 'A'],
    keyImages: [KeyLeftImSrc, KeyAImgSrc],
  },
  Right: {
    labels: ['Движение вправо', 'Выбор предмета справа'],
    keyLabels: ['Arrow Right', 'D'],
    keyImages: [KeyRightImSrc, KeyDImgSrc],
  },
  Interact: {
    labels: ['Войти в режим ваимодействия', 'Открыть модальное окно'],
    keyLabels: ['Enter', 'Space'],
    keyImages: [KeyEnterImgSrc, KeySpaceImgSrc],
  },
  Exit: {
    labels: ['Выйти из режима взаимодействия', 'Закрыть модальное окно'],
    keyLabels: ['Esc', 'Q'],
    keyImages: [KeyEscImgSrc, KeyQImgSrc],
  },
  ReceiptsJournal: {
    labels: ['Открыть информацию о журнале рецептов'],
    keyLabels: ['J'],
    keyImages: [KeyJImgSrc],
  },
  WinInfo: {
    labels: ['Открыть информацию о рецептах для победы'],
    keyLabels: ['K'],
    keyImages: [KeyKImgSrc],
  },
  Controls: {
    labels: ['Открыть информацию об управлении'],
    keyLabels: ['L'],
    keyImages: [KeyLImgSrc],
  },
  ReceiptItem: {
    labels: ['Выбрать рецепт в журнале рецептов'],
    keyLabels: ['LMB'],
    keyImages: [LMBImgSrc],
  },
}
