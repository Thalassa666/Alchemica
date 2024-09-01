import { useEffect, useRef } from 'react'
import { usePlayer } from './lib/usePlayer'
import { BackgroundOptions, useBackground } from './lib/useBackground'
import LevelBackgroundSrc from '/level-background.jpg'
import { Game } from './constants/misc'
import { useCraftTools } from './lib/useCraftTools'
import { useGameBorders } from './lib/useGameBorders'
import { useCraftDialog } from './lib/useCraftDialog'
import { useNotifications } from './lib/useNotifications'
import { Receipts } from './constants/receipts'
import { CraftType } from './constants/craftTools'
import { useGameState } from './lib/useGameState'

const backgroundOptions: BackgroundOptions = {
  src: LevelBackgroundSrc,
  position: { x: 0, y: 0 },
  size: { width: Game.Size.width, height: Game.Size.height },
}

export const GameClient = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

  const { updateStatistic } = useGameState()
  const background = useBackground()
  const borders = useGameBorders()
  const craftTools = useCraftTools()
  const player = usePlayer()
  const craftDialog = useCraftDialog()
  const notifications = useNotifications()

  const init = () => {
    const potions = Object.values(Receipts).filter(
      receipt => receipt.type === CraftType.Potion
    )

    if (potions.length < Game.PotionsToWin) {
      throw new Error(
        `Рецептов для победы - ${potions.length}, а набрать нужно - ${Game.PotionsToWin}. Проверьте настройки.`
      )
    }
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
