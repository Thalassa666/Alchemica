import { Collision } from '../types/types'

/** Конфигурация игры */
export const Game = {
  Size: { width: 1280, height: 720 },
  PotionsToWin: 3,
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
  Notification: '#20222d99',
  Border: colorOnDev('#ff64644d'),
  CraftToolNearPlayer: colorOnDev('lightgoldenrodyellow'),
  CraftToolObject: colorOnDev('#ff64ff4d'),
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
