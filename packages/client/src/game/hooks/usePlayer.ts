import CharGoLeft2ImgSrc from '@assets/images/character/character-go-left-phase-2.png'
import CharGoLeft3ImgSrc from '@assets/images/character/character-go-left-phase-3.png'
import CharGoLeft4ImgSrc from '@assets/images/character/character-go-left-phase-4.png'
import CharGoLeft1ImgSrc from '@assets/images/character/character-go-left.png'
import CharGoRight1ImgSrc from '@assets/images/character/character-go-right-phase-1.png'
import CharGoRight2ImgSrc from '@assets/images/character/character-go-right-phase-2.png'
import CharGoRight3ImgSrc from '@assets/images/character/character-go-right-phase-3.png'
import CharGoRight4ImgSrc from '@assets/images/character/character-go-right-phase-4.png'
import CharIdleLeftImgSrc from '@assets/images/character/character-idle-left.png'
import CharIdleRightImgSrc from '@assets/images/character/character-idle-right.png'
import { Direction } from '@game/constants/player'
import { useRef } from 'react'
import { CanvasContext } from '../types/types'
import { useCraftTools } from './useCraftTools'
import { useGameBorders } from './useGameBorders'
import { useGameState } from './useGameState'
import { useImage } from './useImage'
import { useMovement } from './useMovement'

/** Использовать данные и управление игрока */
export const usePlayer = () => {
  useMovement()
  const { getPlayer, updatePlayer } = useGameState()
  const borders = useGameBorders()
  const craftTools = useCraftTools()
  const image = useImage()

  const movePhaseRef = useRef({
    currentStep: 1,
    trottledStep: 0,
    frameRateBuffer: 10, // Чем выше, тем плавнее будут движения
  })

  /** Отрисовать положение игрока */
  const draw = (context: CanvasContext) => {
    const { position, size } = getPlayer()

    /* Сначала отрисовать спрайт */
    image.draw(context, { src: getImgSrc(), size, position })

    movePhaseRef.current.trottledStep = movePhaseRef.current.trottledStep + 1

    if (
      movePhaseRef.current.trottledStep %
        movePhaseRef.current.frameRateBuffer ===
      0
    ) {
      if (movePhaseRef.current.currentStep === 4) {
        movePhaseRef.current.currentStep = 1
        return
      }

      movePhaseRef.current.currentStep = movePhaseRef.current.currentStep + 1
    }
  }

  /** Получить изображение  */
  const getImgSrc = () => {
    const direction = getPlayer().lastDirectionX
    const isMoving = getPlayer().velocity.x !== 0
    const current = movePhaseRef.current.currentStep

    if (isMoving && direction === Direction.Left) {
      switch (current) {
        case 2:
          return CharGoLeft2ImgSrc
        case 3:
          return CharGoLeft3ImgSrc
        case 4:
          return CharGoLeft4ImgSrc
        default:
          return CharGoLeft1ImgSrc
      }
    }

    if (isMoving && direction === Direction.Right) {
      switch (current) {
        case 2:
          return CharGoRight2ImgSrc
        case 3:
          return CharGoRight3ImgSrc
        case 4:
          return CharGoRight4ImgSrc
        default:
          return CharGoRight1ImgSrc
      }
    }

    return direction === Direction.Left
      ? CharIdleLeftImgSrc
      : CharIdleRightImgSrc
  }

  /** Обновить положение игрока */
  const update = (_context: CanvasContext) => {
    const { position, velocity, size, canMove } = getPlayer()

    const updPosition = {
      x: position.x + velocity.x,
      y: position.y + velocity.y,
    }

    const updVelocity = {
      x: velocity.x,
      y: velocity.y,
    }

    const border = borders.checkForNearBorder({
      ...updPosition,
      ...size,
    })

    /* Сбросить все ускорения и позицию, если есть коллизия с границей игры */
    if (border || !canMove) {
      updVelocity.x = 0
      updVelocity.y = 0
      updPosition.x = position.x
      updPosition.y = position.y
    }

    craftTools.checkInteraction({ ...updPosition, ...size })

    updatePlayer({
      position: updPosition,
      velocity: updVelocity,
    })
  }

  return {
    draw,
    update,
  }
}
