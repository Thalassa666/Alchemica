import { useEffect, useRef } from 'react'
import { usePlayer } from './lib/usePlayer'
import { BackgroundOptions, useBackground } from './lib/useBackground'
import LevelBackgroundSrc from '/level-background.jpg'
import { GameSize } from './constants/misc'
import { useCraftTools } from './lib/useCraftTools'
import { useGameBorders } from './lib/useGameBorders'
import { useCraftDialog } from './lib/useCraftDialog'
import { useGameState } from './lib/useGameState'
import { IngredientsMap } from './constants/ingredients'

const backgroundOptions: BackgroundOptions = {
  src: LevelBackgroundSrc,
  position: { x: 0, y: 0 },
  size: { width: GameSize.width, height: GameSize.height },
}

export const GameClient = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

  const background = useBackground()
  const borders = useGameBorders()
  const craftTools = useCraftTools()
  const player = usePlayer()
  const craftDialog = useCraftDialog()

  const { updateInventory } = useGameState()

  const animate = () => {
    window.requestAnimationFrame(animate)

    const canvas = canvasRef.current
    const ctx = ctxRef.current

    if (canvas && ctx) {
      ctx.clearRect(0, 0, GameSize.width, GameSize.height)

      background.draw({ canvas, ctx }, backgroundOptions)
      borders.draw({ canvas, ctx })
      craftTools.draw({ canvas, ctx })
      player.draw({ canvas, ctx })
      player.update({ canvas, ctx })
      craftDialog.draw({ canvas, ctx })
    }
  }

  useEffect(() => {
    ctxRef.current = canvasRef.current?.getContext('2d') ?? null
    animate()
  }, [])

  useEffect(() => {
    updateInventory({ all: Object.values(IngredientsMap) })
  }, [])

  return (
    <canvas ref={canvasRef} width={GameSize.width} height={GameSize.height} />
  )
}
