import { useMemo } from 'react'
import { CraftType } from '../constants/craftTools'
import { IngredientsMap } from '../constants/ingredients'
import { PlayerInitial } from '../constants/player'
import { IngredientReceipts, PotionReceipts } from '../constants/receipts'
import {
  CraftToolsState,
  GameNotification,
  GameStateType,
  GameStatistic,
  InventoryItem,
  InventoryState,
  PlayerState,
  ReceiptBookState,
} from '../types/types'

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
  receiptBook: {
    isDialogOpen: false,
    potions: PotionReceipts,
    ingredients: IngredientReceipts,
    hovered: null,
    selected: null,
    activePage: 1,
  },
  notifications: [],
  statistic: {
    startedAt: null,
    endedAt: null,
    itemsToWin: [],
    totalScore: 0,
    wastedReceipts: 0,
    isInitialized: false,
    isWinConditionDialogOpen: true,
    isControlsDialogOpen: false,
    isIntroDialogOpen: true,
    step: 'pending',
  },
}

class GameState {
  static _instance: GameState

  player = defaultState.player
  craftTools = defaultState.craftTools
  inventory = defaultState.inventory
  receiptBook = defaultState.receiptBook
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

  getReceiptBook = (): ReceiptBookState => {
    return this.receiptBook
  }
  updateReceiptBook = (updates: Partial<ReceiptBookState>): void => {
    this.receiptBook = { ...this.receiptBook, ...updates }
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
    this.receiptBook = defaultState.receiptBook
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
      getReceiptBook,
      updateReceiptBook,
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

    const getReceiptsList = () => {
      const { potions, ingredients } = getReceiptBook()

      return {
        potions: Object.values(potions),
        ingredients: Object.values(ingredients),
      }
    }

    return {
      getPlayer,
      updatePlayer,
      getCraftTools,
      updateCraftTools,
      getInventory: getSortedInventory,
      updateInventory,
      getReceiptBook,
      getReceiptsList,
      updateReceiptBook,
      getNotifications,
      setNotifications,
      getStatistic,
      updateStatistic,
      resetGameState,
    }
  }, [])

  return exports
}
