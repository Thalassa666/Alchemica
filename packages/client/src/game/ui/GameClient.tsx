import { useEffect, useRef } from 'react'
import { usePlayer } from '../hooks/usePlayer'
import { BackgroundOptions, useImage } from '../hooks/useImage'
import { Game } from '../constants/misc'
import { useCraftTools } from '../hooks/useCraftTools'
import { useGameBorders } from '../hooks/useGameBorders'
import { useCraftDialog } from '../hooks/useCraftDialog'
import { useNotifications } from '../hooks/useNotifications'
import { Receipts } from '../constants/receipts'
import { CraftType } from '../constants/craftTools'
import { useGameState } from '../hooks/useGameState'
import LevelBackgroundSrc from '@assets/images/level-background.jpg'

const backgroundOptions: BackgroundOptions = {
  src: LevelBackgroundSrc,
  position: { x: 0, y: 0 },
  size: { width: Game.Size.width, height: Game.Size.height },
}

export const GameClient = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

  const { updateStatistic } = useGameState()
  const background = useImage()
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
