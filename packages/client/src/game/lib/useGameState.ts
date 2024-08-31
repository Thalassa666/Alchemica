import { useMemo } from 'react'
import { PlayerInitial } from '../constants/player'
import {
  CraftToolsState,
  InventoryItem,
  InventoryState,
  PlayerState,
} from '../types/types'
import { IngredientsMap } from '../constants/ingredients'

const initialInventory = Object.values(IngredientsMap).filter(
  item => item.type === 'ingredient' && item.condition === 'Raw'
)

const sortInventory = (inventory: InventoryItem[]) => {
  return inventory.slice().sort((a, b) => a.label.localeCompare(b.label))
}

class GameState {
  static _instance: GameState

  player: PlayerState = PlayerInitial
  craftTools: CraftToolsState = {
    nearPlayer: null,
    active: null,
  }
  inventory: InventoryState = {
    all: initialInventory,
    selected: [null],
    selectingIndex: 0,
    isPicking: false,
    itemByReceipt: null,
  }
  canPlayerMove = true

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

  getCanPlayerMove = (): boolean => {
    return this.canPlayerMove
  }
  setCanPlayerMove = (canMove: boolean): void => {
    this.canPlayerMove = canMove
  }
}

const gameState = new GameState()

export const useGameState = () => {
  const exports = useMemo(() => {
    const {
      getPlayer,
      updatePlayer,
      getCraftTools,
      updateCraftTools,
      getInventory,
      updateInventory,
      getCanPlayerMove,
      setCanPlayerMove,
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
      getCanPlayerMove,
      setCanPlayerMove,
    }
  }, [])

  return exports
}
