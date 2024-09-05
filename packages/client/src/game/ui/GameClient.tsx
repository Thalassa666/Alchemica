import LevelBackgroundSrc from '@assets/images/level-background.jpg'
import { useEffect, useRef } from 'react'
import { CraftType } from '../constants/craftTools'
import { Game } from '../constants/misc'
import { Receipts } from '../constants/receipts'
import * as GameHooks from '../hooks'
import type { BackgroundOptions } from '../hooks'

const backgroundOptions: BackgroundOptions = {
  src: LevelBackgroundSrc,
  position: { x: 0, y: 0 },
  size: { width: Game.Size.width, height: Game.Size.height },
}

export const GameClient = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

  const { updateStatistic } = GameHooks.useGameState()
  const background = GameHooks.useImage()
  const borders = GameHooks.useGameBorders()
  const craftTools = GameHooks.useCraftTools()
  const player = GameHooks.usePlayer()
  const craftDialog = GameHooks.useCraftDialog()
  const notifications = GameHooks.useNotifications()

  const init = () => {
    const potions = Object.values(Receipts).filter(
      receipt => receipt.type === CraftType.Potion
    )

    if (potions.length < Game.PotionsToWin) {
      throw new Error(
        `Рецептов для победы - ${potions.length}, а набрать нужно - ${Game.PotionsToWin}. Проверьте настройки.`
      )
    }

    // TODO: Добавить условие победы/время начала игры
  }

  const animate = () => {
    window.requestAnimationFrame(animate)

    const canvas = canvasRef.current
    const ctx = ctxRef.current

    if (canvas && ctx) {
      ctx.clearRect(0, 0, Game.Size.width, Game.Size.height)

      background.draw({ canvas, ctx }, backgroundOptions)
      borders.draw({ canvas, ctx })
      craftTools.draw({ canvas, ctx })
      player.draw({ canvas, ctx })
      player.update({ canvas, ctx })
      craftDialog.draw({ canvas, ctx })
      notifications.draw({ canvas, ctx })
    }
  }

  useEffect(() => {
    ctxRef.current = canvasRef.current?.getContext('2d') ?? null
    init()
    animate()
  }, [])

  return (
    <canvas ref={canvasRef} width={Game.Size.width} height={Game.Size.height} />
  )
}
