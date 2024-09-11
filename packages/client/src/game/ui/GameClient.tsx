import LevelBackgroundSrc from '@assets/images/level-background.jpg'
import { CanvasContext, GameStatistic } from '@game/types/types'
import { useEffect, useRef } from 'react'
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

export const GameClient = ({ onGameEnd }: Props) => {
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

  const init = (context: CanvasContext) => {
    initWinCondition()
    mouseIteration.init(context)
  }

  const checkForRedirects = () => {
    const statistic = getStatistic()

    if (statistic.endedAt) {
      onGameEnd(statistic)
    }
  }

  const drawGameElements = (context: CanvasContext) => {
    background.draw(context, backgroundOptions)
    quickTools.draw(context)
    borders.draw(context)
    quickTools.draw(context)
    craftTools.draw(context)
    player.draw(context)
    player.update(context)
    craftDialog.draw(context)
    notifications.draw(context)
    receiptBook.draw(context)
    winConditionDialog.draw(context)
  }

  const animate = () => {
    animateRef.current = window.requestAnimationFrame(animate)

    checkForRedirects()

    const canvas = canvasRef.current
    const ctx = ctxRef.current

    if (canvas && ctx) {
      ctx.clearRect(0, 0, Game.Size.width, Game.Size.height)

      drawGameElements({ canvas, ctx })
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
