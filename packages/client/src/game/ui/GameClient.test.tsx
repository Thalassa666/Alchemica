import '@testing-library/jest-dom'
import 'jest-canvas-mock'
import { render } from '@testing-library/react'
import { GameClient } from '@src/game'
import * as GameHooks from '../hooks'

const mockGetStatistic = jest.fn(() => ({
  endedAt: null,
}))

jest.mock('../hooks', () => ({
  useGameState: jest.fn(() => ({
    getStatistic: mockGetStatistic,
    resetGameState: jest.fn(),
  })),
  useWinLoose: jest.fn(() => ({
    initWinCondition: jest.fn(),
  })),
  useWinConditionDialog: jest.fn(() => ({
    draw: jest.fn(),
  })),
  useQuickTools: jest.fn(() => ({
    draw: jest.fn(),
  })),
  useCraftTools: jest.fn(() => ({
    draw: jest.fn(),
  })),
  useGameBorders: jest.fn(() => ({
    draw: jest.fn(),
  })),
  usePlayer: jest.fn(() => ({
    draw: jest.fn(),
    update: jest.fn(),
  })),
  useCraftDialog: jest.fn(() => ({
    draw: jest.fn(),
  })),
  useNotifications: jest.fn(() => ({
    draw: jest.fn(),
  })),
  useReceiptsBook: jest.fn(() => ({
    draw: jest.fn(),
  })),
  useControlsDialog: jest.fn(() => ({
    draw: jest.fn(),
  })),
  useImage: jest.fn(() => ({
    draw: jest.fn(),
    drawOverlayFullSize: jest.fn(),
    drawOverlayByLocation: jest.fn(),
  })),
  useMouseInteraction: jest.fn(() => ({
    init: jest.fn(),
    destroy: jest.fn(),
  })),
  useFullScreen: jest.fn(() => ({
    init: jest.fn(),
    destroy: jest.fn(),
    draw: jest.fn(),
  })),
}))

describe('GameClient', () => {
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
