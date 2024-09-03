import { CanvasContext, FullLocation, Position, Size } from '../types/types'
import { GameColors, Game } from '../constants/misc'

export type BackgroundOptions = {
  src: string
  position: Position
  size: Size
}

/** Использовать фоновые изображения и оверлеи */
export const useImage = () => {
  /** Отрисовать переданное изображение в качестве заднего фона */
  const draw = (context: CanvasContext, options: BackgroundOptions) => {
    const { position, src, size } = options

    const image = new Image()
    image.src = src

    context.ctx.drawImage(
      image,
      position.x,
      position.y,
      size.width,
      size.height
    )
  }

  /** Отрисовать подложку - оверлей на весь размер экрана игры */
  const drawOverlayFullSize = (context: CanvasContext) => {
    context.ctx.fillStyle = GameColors.Overlay
    context.ctx.fillRect(0, 0, Game.Size.width, Game.Size.height)
    context.ctx.fillStyle = 'transparent'
  }

  /** Отрисовать подложку - оверлей по заданному размеру, разбросу, скруглением соответственно */
  const drawOverlayByLocation = (
    context: CanvasContext,
    boxesLocation: FullLocation,
    spread = 25,
    round = 25
  ) => {
    const overlaySize = {
      width: boxesLocation.width + spread * 2,
      height: boxesLocation.height + spread * 2,
    }

    const overlayPos = {
      x: boxesLocation.x - spread,
      y: boxesLocation.y - spread,
    }

    context.ctx.beginPath()
    context.ctx.roundRect(
      overlayPos.x,
      overlayPos.y,
      overlaySize.width,
      overlaySize.height,
      round
    )

    context.ctx.fillStyle = GameColors.Overlay
    context.ctx.fill('evenodd')
    context.ctx.stroke()
    context.ctx.fillStyle = 'transparent'
  }

  return {
    draw,
    drawOverlayFullSize,
    drawOverlayByLocation,
  }
}
