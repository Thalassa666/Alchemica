import { ConditionNames } from 'game/constants/conditions'
import { Direction } from '../constants/player'
import { CraftType } from 'game/constants/craftTools'

export type CanvasContext = {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
}

export type Position = {
  x: number
  y: number
}

export type Size = {
  width: number
  height: number
}

export type FullLocation = Position & Size

export type DirectionType = typeof Direction[keyof typeof Direction]

export type PlayerState = {
  position: Position
  velocity: Position
  size: Size
  lastDirectionX: typeof Direction.Left | typeof Direction.Right
  canMove: boolean
}

export type Collision = Position &
  Size & {
    name: string
  }

export type ConditionType = typeof ConditionNames[keyof typeof ConditionNames]

export type CraftTool = {
  key: string
  label: string
  imgSrc: string
  comboCount: number
  collision: Collision
  toConditions: Record<string, boolean>
}

export type CraftToolsState = {
  nearPlayer: CraftTool | null
  active: CraftTool | null
}

export type CraftType = typeof CraftType[keyof typeof CraftType]

export type InventoryItem = {
  key: string
  imgSrc: string
  type: CraftType
  condition: ConditionType
  label: string
}

export type InventoryState = {
  all: InventoryItem[]
  selected: (InventoryItem | null)[]
  selectingIndex: number
  itemByReceipt: InventoryItem | null
  isPicking: boolean
}

export type Receipt = {
  key: string
  tool: CraftTool['key']
  type: CraftType
  ingredientNames: string[]
}

export type GameNotification = {
  id: string | number
  title: string
  text: string
  imgSrc?: string
  timeout?: number
}

export type GameStatistic = {
  startedAt: string | null
  endedAt: string | null
  itemsToWin: Record<string, InventoryItem>
  totalScore: number
}

export type GameStateType = {
  player: PlayerState
  craftTools: CraftToolsState
  inventory: InventoryState
  notifications: GameNotification[]
  statistic: GameStatistic
}
