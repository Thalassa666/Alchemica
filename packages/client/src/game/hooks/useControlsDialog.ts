import { useWindowEffect } from '@core/hooks'
import { Game, GameColors, GameControls } from '@game/constants/misc'
import { runIfKeyMatch } from '@game/helpers/isGameKeyMatch'
import { CanvasContext } from '@game/types/types'
import { useGameState } from './useGameState'
import { useImage } from './useImage'

const ControlsValues = Object.values(GameControls)

const IconsConfig = { Width: 40, Height: 40 }
const Padding = { x: 15, y: 15 }
const Gap = { x: 8, y: 8 }

const DialogConfig = {
  size: {
    width: 600,
    height:
      ControlsValues.length * IconsConfig.Height +
      ControlsValues.length * Gap.y +
      Padding.y,
  },
  padding: { x: Padding.x, y: Padding.y },
  getPosition: function getPosition() {
    return {
      x: Game.Size.width / 2 - this.size.width / 2,
      y: Game.Size.height / 2 - this.size.height / 2,
    }
  },
  label: {
    size: 18,
    color: GameColors.TextColor,
    gap: { x: 14, y: 8 },
  },
  imagesList: {
    gap: { x: Gap.x, y: Gap.y },
    icon: { width: IconsConfig.Width, height: IconsConfig.Height },
  },
}

export const useControlsDialog = () => {
  const { getStatistic, updatePlayer, updateStatistic } = useGameState()
  const image = useImage()

  const handleKeydown = (evt: KeyboardEvent) => {
    const onModalOpen = () => {
      if (getStatistic().isControlsDialogOpen) {
        return
      }

      updateStatistic({ isControlsDialogOpen: true })
      updatePlayer({ canMove: false })
    }

    const onModalClose = () => {
      if (!getStatistic().isControlsDialogOpen) {
        return
      }

      updateStatistic({ isControlsDialogOpen: false })
      updatePlayer({ canMove: true })
    }

    runIfKeyMatch('Controls', evt, onModalOpen)
    runIfKeyMatch('Exit', evt, onModalClose)
  }

  useWindowEffect('keydown', handleKeydown)

  const draw = (context: CanvasContext) => {
    if (!getStatistic().isControlsDialogOpen) {
      return
    }

    drawOverlay(context)
    drawControlsList(context)
  }

  const drawOverlay = (context: CanvasContext) => {
    image.drawOverlayFullSize(context)
    image.drawOverlayByLocation(context, {
      width: DialogConfig.size.width,
      height: DialogConfig.size.height,
      x: DialogConfig.getPosition().x,
      y: DialogConfig.getPosition().y,
    })
  }

  const drawControlsList = (context: CanvasContext) => {
    const imagesListPos = {
      x: DialogConfig.getPosition().x + DialogConfig.padding.x,
      y: DialogConfig.getPosition().y + DialogConfig.padding.y,
    }

    let imagesMaxPosX = imagesListPos.x
    let imagePosY = imagesListPos.y

    ControlsValues.forEach((control, index) => {
      /* Иконки клавиш */
      control.keyImages.forEach((src, imgIndex) => {
        const x =
          imagesListPos.x +
          (DialogConfig.imagesList.gap.x + DialogConfig.imagesList.icon.width) *
            imgIndex

        const y =
          imagesListPos.y +
          (DialogConfig.imagesList.gap.y +
            DialogConfig.imagesList.icon.height) *
            index

        imagePosY = y

        if (x > imagesMaxPosX) {
          imagesMaxPosX = x
        }

        image.draw(context, {
          src,
          position: {
            x,
            y,
          },
          size: {
            width: DialogConfig.imagesList.icon.width,
            height: DialogConfig.imagesList.icon.height,
          },
        })
      })

      /* Текст - описание */
      const label = control.labels.join(' / ')

      context.ctx.font = `${DialogConfig.label.size}px serif`
      context.ctx.fillStyle = DialogConfig.label.color

      context.ctx.fillText(
        label,
        imagesMaxPosX +
          DialogConfig.label.gap.x +
          DialogConfig.imagesList.icon.width,
        imagePosY +
          DialogConfig.imagesList.gap.y +
          DialogConfig.imagesList.icon.height / 2
      )
    })
  }

  return {
    draw,
  }
}
