import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import { GameClient } from '@src/game'
import * as GameHooks from '../hooks'

jest.mock('../hooks', () => ({
  useGameState: jest.fn(() => ({
    getStatistic: jest.fn(),
    resetGameState: jest.fn(),
  })),
  useWinLoose: jest.fn(() => ({
    initWinCondition: jest.fn(),
  })),
  useWinConditionDialog: jest.fn(() => ({
    draw: jest.fn(),
  })),
  useQuickTools: jest.fn(),
  useCraftTools: jest.fn(),
  useGameBorders: jest.fn(),
  usePlayer: jest.fn(),
  useCraftDialog: jest.fn(),
  useNotifications: jest.fn(),
  useReceiptsBook: jest.fn(),
  useControlsDialog: jest.fn(),
  useImage: jest.fn(),
  useMouseInteraction: jest.fn(),
  useFullScreen: jest.fn(),
}))

describe('GameClient', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render canvas with correct dimensions', () => {
    render(<GameClient onGameEnd={jest.fn()} />)

    const canvas = document.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
    expect(canvas).toHaveAttribute('width', '1280')
    expect(canvas).toHaveAttribute('height', '720')
  })

  test('should initialize game hooks on init', () => {
    render(<GameClient onGameEnd={jest.fn()} />)

    expect(GameHooks.useGameState).toHaveBeenCalled()
    expect(GameHooks.useFullScreen).toHaveBeenCalled()
    expect(GameHooks.useMouseInteraction).toHaveBeenCalled()
  })
})
