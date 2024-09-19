import { ConditionNames } from '../constants/conditions'
import { CraftType } from '../constants/craftTools'
import { Direction } from '../constants/player'

export type KeyId = {
  key: string
}

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

export type Collision = FullLocation & {
  name: string
}

export type DirectionType = (typeof Direction)[keyof typeof Direction]

export type PlayerState = {
  position: Position
  size: Size
  velocity: Position
  lastDirectionX: typeof Direction.Left | typeof Direction.Right
  canMove: boolean
}

export type ConditionType = (typeof ConditionNames)[keyof typeof ConditionNames]

export type CraftTool = KeyId & {
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

export type CraftType = (typeof CraftType)[keyof typeof CraftType]

export type ItemBase = KeyId & {
  type: CraftType
}

export type InventoryItem = ItemBase & {
  label: string
  imgSrc: string
  condition: ConditionType
}

export type InventoryState = {
  all: InventoryItem[]
  selected: (InventoryItem | null)[]
  selectingIndex: number
  itemByReceipt: InventoryItem | null
  isPicking: boolean
}

export type Receipt = ItemBase & {
  tool: CraftTool['key']
  ingredientNames: string[]
}

export type ReceiptBookState = {
  isDialogOpen: boolean
  potions: Record<string, Receipt>
  ingredients: Record<string, Receipt>
  hovered: Receipt | null
  selected: Receipt | null
  activePage: number
}

export type GameNotification = KeyId & {
  title: string
  text: string
  imgSrc?: string
  timeout?: number
}

export type GameStep = 'won' | 'lost' | 'pending'

export type GameStatistic = {
  startedAt: number | null
  endedAt: number | null
  itemsToWin: InventoryItem[]
  totalScore: number
  wastedReceipts: number
  isInitialized: boolean
  isWinConditionDialogOpen: boolean
  isControlsDialogOpen: boolean
  isIntroDialogOpen: boolean
  step: GameStep
}

export type GameStateType = {
  player: PlayerState
  craftTools: CraftToolsState
  receiptBook: ReceiptBookState
  inventory: InventoryState
  notifications: GameNotification[]
  statistic: GameStatistic
}
