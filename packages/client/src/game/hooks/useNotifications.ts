import NotificationDefaultImgSrc from '@assets/images/icons/fullscreen.png'
import { GameColors, Game } from '../constants/misc'
import { CanvasContext, FullLocation, GameNotification } from '../types/types'
import { useGameState } from './useGameState'
import { useImage } from './useImage'

const DefaultTimeout = 3000

/** Использовать короткое уведомление для пользователя */
export const useNotifications = () => {
  const { getNotifications, setNotifications } = useGameState()
  const image = useImage()

  const draw = (context: CanvasContext) => {
    const notifications = getNotifications()

    notifications.forEach((notification, index) => {
      drawNotification(context, notification, index)
    })
  }

  const drawNotification = (
    context: CanvasContext,
    notification: GameNotification,
    rowIndex: number
  ) => {
    const bgLocation = drawBackground(context, rowIndex)
    const imgLocation = drawImage(context, notification, bgLocation)
    drawText(context, notification, bgLocation, imgLocation)
  }

  /** Отрисовать подложку */
  const drawBackground = (
    context: CanvasContext,
    rowIndex: number
  ): FullLocation => {
    const offset = 35

    const size = {
      width: 400,
      height: 80,
    }

    const prevBgPosY = rowIndex * (offset + size.height)

    const pos = {
      x: Game.Size.width - offset - size.width,
      y: offset + prevBgPosY,
    }

    context.ctx.fillStyle = GameColors.Notification
    context.ctx.fillRect(pos.x, pos.y, size.width, size.height)
    context.ctx.fillStyle = 'transparent'

    return { ...size, ...pos }
  }

  /** Отрисовать иконку - изображение */
  const drawImage = (
    context: CanvasContext,
    notification: GameNotification,
    bgLocation: FullLocation
  ): FullLocation => {
    const xOffset = 20

    const size = {
      width: 50,
      height: 50,
    }

    const pos = {
      x: bgLocation.x + xOffset,
      y: bgLocation.y + bgLocation.height / 2 - size.height / 2,
    }

    image.draw(context, {
      src: notification.imgSrc ?? NotificationDefaultImgSrc,
      position: pos,
      size: size,
    })

    return { ...size, ...pos }
  }

  /** Отрисовать текст */
  const drawText = (
    context: CanvasContext,
    notification: GameNotification,
    bgLocation: FullLocation,
    imgLocation: FullLocation
  ) => {
    const rowGap = 30
    const columnGap = 30

    const titlePos = {
      x: imgLocation.x + imgLocation.width + columnGap,
      y: bgLocation.y + rowGap,
    }

    const textPos = {
      x: titlePos.x,
      y: titlePos.y + rowGap,
    }

    context.ctx.fillStyle = GameColors.TextColor
    context.ctx.font = '18px solid'
    context.ctx.fillText(notification.title, titlePos.x, titlePos.y)
    context.ctx.font = '16px solid'
    context.ctx.fillText(notification.text, textPos.x, textPos.y)
    context.ctx.fillStyle = 'transparent'
  }

  /** Удалить одно уведомление */
  const deleteNotification = (key: GameNotification['key']) => {
    const updated = getNotifications().filter(
      notification => notification.key !== key
    )

    setNotifications(updated)
  }

  /** Добавить уведомление */
  const addNotification = (notification: Omit<GameNotification, 'key'>) => {
    const key = Math.random().toString()
    const current = getNotifications()

    setNotifications([...current, { ...notification, key }])

    setTimeout(() => {
      deleteNotification(key)
    }, notification.timeout ?? DefaultTimeout)
  }

  return {
    draw,
    deleteNotification,
    addNotification,
  }
}
