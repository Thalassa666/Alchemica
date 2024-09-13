import ReceiptsBookImgSrc from '@assets/images/icon-in-progress.png'
import WinningConditionImgSrc from '@assets/images/icon-in-progress.png'
import { Game, GameColors } from '@game/constants/misc'
import { CanvasContext, Position } from '@game/types/types'
import { useEffect, useRef } from 'react'
import { BackgroundOptions, useImage } from './useImage'
import { useMouseInteraction } from './useMouseInteraction'

type QuickTool = {
  key: string
  label: string
  imgSrc: string
}

const QuickTools: QuickTool[] = [
  {
    key: 'ReceiptsBook',
    label: 'J',
    imgSrc: ReceiptsBookImgSrc,
  },
  {
    key: 'WinningCondition',
    label: 'K',
    imgSrc: WinningConditionImgSrc,
  },
]

const QuickToolsModal = {
  toolsCount: QuickTools.length,
  list: {
    gapX: 15,
    gapY: 15,
    paddingX: 15,
  },
  icon: {
    width: 65,
    height: 65,
  },
  backgroundColor: GameColors.Overlay,
  font: {
    size: 20,
    color: GameColors.TextColor,
  },
  getSize: function getSize() {
    return {
      width:
        this.toolsCount * this.icon.width +
        this.toolsCount * this.list.gapX +
        this.list.gapX,
      height: 100,
    }
  },
  getPosition: function getPosition() {
    return { x: Game.Size.width - this.getSize().width - 50, y: 50 }
  },
}

/** Использовать панель быстрого доступа (лента сверху) */
export const useQuickTools = () => {
  const image = useImage()
  const mouse = useMouseInteraction()
  const subscribedNamesRef = useRef<string[]>([])

  useEffect(() => {
    return () => {
      subscribedNamesRef.current.forEach(name => {
        mouse.unSubscribe(name)
      })
    }
  }, [])

  const draw = (context: CanvasContext) => {
    drawOverlay(context)
    drawToolsList(context)
  }

  const drawOverlay = (context: CanvasContext) => {
    context.ctx.fillStyle = QuickToolsModal.backgroundColor
    context.ctx.fillRect(
      QuickToolsModal.getPosition().x,
      QuickToolsModal.getPosition().y,
      QuickToolsModal.getSize().width,
      QuickToolsModal.getSize().height
    )
    context.ctx.fillStyle = 'transparent'
  }

  const drawToolsList = (context: CanvasContext) => {
    QuickTools.forEach((quickTool, index) => {
      const position = {
        x:
          QuickToolsModal.getPosition().x +
          QuickToolsModal.list.paddingX +
          (QuickToolsModal.icon.width + QuickToolsModal.list.gapX) * index,
        y:
          QuickToolsModal.getPosition().y +
          QuickToolsModal.getSize().height / 2 -
          QuickToolsModal.icon.height / 2,
      }

      drawTool(context, quickTool, position)
    })
  }

  const drawTool = (
    context: CanvasContext,
    quickTool: QuickTool,
    position: Position
  ) => {
    const options: BackgroundOptions = {
      src: quickTool.imgSrc,
      size: {
        width: QuickToolsModal.icon.width,
        height: QuickToolsModal.icon.height,
      },
      position,
    }

    image.draw(context, options)

    context.ctx.font = `${QuickToolsModal.font.size}px serif`
    context.ctx.fillStyle = QuickToolsModal.font.color
    context.ctx.textAlign = 'center'
    context.ctx.fillText(
      quickTool.label,
      options.position.x + options.size.width / 2,
      options.position.y + options.size.height + QuickToolsModal.list.gapY
    )
    context.ctx.textAlign = 'left'
  }

  return {
    draw,
  }
}
