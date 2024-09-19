import { fireEvent, renderHook } from '@testing-library/react'
import { useMovement } from '../hooks'
import { VelocitySpeed } from '../constants/player'
import { Direction } from '../constants/player'

const getPlayerMock = jest.fn()
const updatePlayerMock = jest.fn()

jest.mock('../hooks/useGameState', () => ({
  useGameState: () => ({
    getPlayer: getPlayerMock,
    updatePlayer: updatePlayerMock,
  }),
}))

describe('useMovement', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should move left when "ArrowLeft" key is pressed', () => {
    getPlayerMock.mockReturnValue({
      velocity: { x: 0, y: 0 },
      canMove: true,
      lastDirectionX: Direction.Right,
    })

    renderHook(() => useMovement())

    fireEvent.keyDown(window, { key: 'ArrowLeft', code: 'ArrowLeft' })

    expect(updatePlayerMock).toHaveBeenCalledWith({
      velocity: { x: -VelocitySpeed, y: 0 },
      lastDirectionX: Direction.Left,
    })
  })

  test('should move right when "ArrowRight" key is pressed', () => {
    getPlayerMock.mockReturnValue({
      velocity: { x: 0, y: 0 },
      canMove: true,
      lastDirectionX: Direction.Left,
    })

    renderHook(() => useMovement())

    fireEvent.keyDown(window, { key: 'ArrowRight', code: 'ArrowRight' })

    expect(updatePlayerMock).toHaveBeenCalledWith({
      velocity: { x: VelocitySpeed, y: 0 },
      lastDirectionX: Direction.Right,
    })
  })

  test('should stop moving when "ArrowLeft" or "ArrowRight" key is released', () => {
    getPlayerMock.mockReturnValue({
      velocity: { x: -VelocitySpeed, y: 0 },
      canMove: true,
      lastDirectionX: Direction.Left,
    })

    renderHook(() => useMovement())

    fireEvent.keyUp(window, { key: 'ArrowLeft', code: 'ArrowLeft' })

    expect(updatePlayerMock).toHaveBeenCalledWith({
      velocity: { x: 0, y: 0 },
      lastDirectionX: Direction.Left,
    })

    getPlayerMock.mockReturnValue({
      velocity: { x: VelocitySpeed, y: 0 },
      canMove: true,
      lastDirectionX: Direction.Right,
    })

    fireEvent.keyUp(window, { key: 'ArrowRight', code: 'ArrowRight' })

    expect(updatePlayerMock).toHaveBeenCalledWith({
      velocity: { x: 0, y: 0 },
      lastDirectionX: Direction.Right,
    })
  })

  test('should not move if player cannot move', () => {
    getPlayerMock.mockReturnValue({
      velocity: { x: 0, y: 0 },
      canMove: false,
      lastDirectionX: Direction.Left,
    })

    renderHook(() => useMovement())

    fireEvent.keyDown(window, { key: 'ArrowLeft', code: 'ArrowLeft' })

    expect(updatePlayerMock).not.toHaveBeenCalled()
  })
})
