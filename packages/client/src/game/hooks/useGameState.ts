import { useMemo } from 'react'
import {
  CraftToolsState,
  GameNotification,
  GameStateType,
  GameStatistic,
  InventoryItem,
  InventoryState,
  PlayerState,
} from '../types/types'
import { PlayerInitial } from '../constants/player'
import { IngredientsMap } from '../constants/ingredients'
import { CraftType } from '../constants/craftTools'

const initialInventory = Object.values(IngredientsMap).filter(
  item => item.type === CraftType.Ingredient && item.condition === 'Raw'
)

const sortInventory = (inventory: InventoryItem[]) => {
  return inventory.slice().sort((a, b) => a.label.localeCompare(b.label))
}

const defaultState: GameStateType = {
  player: PlayerInitial,
  craftTools: {
    nearPlayer: null,
    active: null,
  },
  inventory: {
    all: initialInventory,
    selected: [null],
    selectingIndex: 0,
    isPicking: false,
    itemByReceipt: null,
  },
  notifications: [],
  statistic: {
    startedAt: null,
    endedAt: null,
    itemsToWin: {},
    totalScore: 0,
  },
}

class GameState {
  static _instance: GameState

  player = defaultState.player
  craftTools = defaultState.craftTools
  inventory = defaultState.inventory
  notifications = defaultState.notifications
  statistic = defaultState.statistic

  constructor() {
    if (GameState._instance) {
      return GameState._instance
    }

    GameState._instance = this
  }

  getPlayer = (): PlayerState => {
    return this.player
  }
  updatePlayer = (updates: Partial<PlayerState>): void => {
    this.player = { ...this.player, ...updates }
  }

  getCraftTools = (): CraftToolsState => {
    return this.craftTools
  }
  updateCraftTools = (updates: Partial<CraftToolsState>): void => {
    this.craftTools = { ...this.craftTools, ...updates }
  }

  getInventory = (): InventoryState => {
    return this.inventory
  }
  updateInventory = (updates: Partial<InventoryState>): void => {
    this.inventory = { ...this.inventory, ...updates }
  }

  getNotifications = (): GameNotification[] => {
    return this.notifications
  }
  setNotifications = (notifications: GameNotification[]): void => {
    this.notifications = notifications
  }

  getStatistic = (): GameStatistic => {
    return this.statistic
  }
  updateStatistic = (updates: Partial<GameStatistic>): void => {
    this.statistic = { ...this.statistic, ...updates }
  }

  resetGameState = (): void => {
    this.player = defaultState.player
    this.craftTools = defaultState.craftTools
    this.inventory = defaultState.inventory
    this.notifications = defaultState.notifications
    this.statistic = defaultState.statistic
  }
}

const gameState = new GameState()

/** Использовать состояние игры */
export const useGameState = () => {
  const exports = useMemo(() => {
    const {
      getPlayer,
      updatePlayer,
      getCraftTools,
      updateCraftTools,
      getInventory,
      updateInventory,
      getNotifications,
      setNotifications,
      getStatistic,
      updateStatistic,
      resetGameState,
    } = gameState

    const getSortedInventory = () => {
      const { all, ...rest } = getInventory()

      return { ...rest, all: sortInventory(all) }
    }

    return {
      getPlayer,
      updatePlayer,
      getCraftTools,
      updateCraftTools,
      getInventory: getSortedInventory,
      updateInventory,
      getNotifications,
      setNotifications,
      getStatistic,
      updateStatistic,
      resetGameState,
    }
  }, [])

  return exports
}
