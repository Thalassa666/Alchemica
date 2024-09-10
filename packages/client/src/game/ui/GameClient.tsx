import LevelBackgroundSrc from '@assets/images/level-background.jpg'
import { CanvasContext, GameStatistic } from '@game/types/types'
import { useEffect, useRef } from 'react'
import { FC } from 'react'
import { Game } from '../constants/misc'
import * as GameHooks from '../hooks'
import type { BackgroundOptions } from '../hooks'

type Props = {
  onGameEnd: (statistic: GameStatistic) => void
}

const backgroundOptions: BackgroundOptions = {
  src: LevelBackgroundSrc,
  position: { x: 0, y: 0 },
  size: { width: Game.Size.width, height: Game.Size.height },
}

export const GameClient: FC<Props> = ({ onGameEnd }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const animateRef = useRef<number | null>(null)

  const { getStatistic, resetGameState } = GameHooks.useGameState()
  const { initWinCondition } = GameHooks.useWinLoose()
  const background = GameHooks.useImage()
  const winConditionDialog = GameHooks.useWinConditionDialog()
  const quickTools = GameHooks.useQuickTools()
  const borders = GameHooks.useGameBorders()
  const craftTools = GameHooks.useCraftTools()
  const player = GameHooks.usePlayer()
  const craftDialog = GameHooks.useCraftDialog()
  const notifications = GameHooks.useNotifications()
  const receiptBook = GameHooks.useReceiptsBook()
  const mouseIteration = GameHooks.useMouseInteraction()

  const checkForRedirects = () => {
    const statistic = getStatistic()

    if (statistic.endedAt) {
      onGameEnd(statistic)
    }
  }

  const init = (context: CanvasContext) => {
    initWinCondition()
    mouseIteration.init(context)
  }

  const animate = () => {
    animateRef.current = window.requestAnimationFrame(animate)

    checkForRedirects()

    const canvas = canvasRef.current
    const ctx = ctxRef.current

    if (canvas && ctx) {
      ctx.clearRect(0, 0, Game.Size.width, Game.Size.height)

      background.draw({ canvas, ctx }, backgroundOptions)
      quickTools.draw({ canvas, ctx })
      borders.draw({ canvas, ctx })
      quickTools.draw({ canvas, ctx })
      craftTools.draw({ canvas, ctx })
      player.draw({ canvas, ctx })
      player.update({ canvas, ctx })
      craftDialog.draw({ canvas, ctx })
      notifications.draw({ canvas, ctx })
      receiptBook.draw({ canvas, ctx })
      winConditionDialog.draw({ canvas, ctx })
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvasRef.current?.getContext('2d')
    ctxRef.current = ctx ?? null

    if (canvas && ctx) {
      init({ canvas, ctx })
      animate()
    }
  }, [])

  useEffect(() => {
    return () => {
      const canvas = canvasRef.current
      const ctx = ctxRef.current

      if (canvas && ctx) {
        mouseIteration.destroy({ canvas, ctx })
      }

      if (animateRef.current) {
        window.cancelAnimationFrame(animateRef.current)
      }

      resetGameState()
    }
  }, [])

  return (
    <canvas ref={canvasRef} width={Game.Size.width} height={Game.Size.height} />
  )
}
